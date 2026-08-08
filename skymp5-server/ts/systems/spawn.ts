import { AxiosError } from "axios";
import { CharacterApi, SaveCharacterRequest } from "../api/CharacterApi";
import { Settings } from "../settings";
import { ApiBridge } from "./apiBridge";
import { Log, System, SystemContext } from "./system";

type Mp = {
  get(formId: number, property: string): any;
  set(formId: number, property: string, value: unknown): void;
  makeProperty(name: string, options: unknown): void;
  makeEventSource(name: string, body: string): void;
};

type StoredCharacter = {
  profileId: number;
  level?: number;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  world?: string;
  cell?: string | null;
  health?: number;
  magicka?: number;
  stamina?: number;
  appearance?: unknown;
  inventory?: unknown;
  equipment?: unknown;
  attributes?: unknown;
  quests?: unknown;
};

type Session = { userId: number; profileId: number; actorId: number };

function randomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Player persistence boundary. Native save storage remains enabled for the
 * world, but player actors are always created from Mongo and are destroyed
 * when their session ends. No player state is read from ChangeForms.
 */
export class Spawn implements System {
  systemName = "Spawn";
  private readonly pendingCharacterCreation = new Map<number, number>();
  private readonly creatingCharacter = new Set<number>();
  private readonly sessions = new Map<number, Session>();
  private lastPeriodicSaveAt = 0;

  constructor(private log: Log) { }

  async initAsync(ctx: SystemContext): Promise<void> {
    const settings = await Settings.get();
    const mp = ctx.svr as unknown as Mp;

    (ctx.svr as any)._onMongoPlayerLevel = (actorId: number, level: unknown) => {
      const session = this.sessions.get(actorId);
      if (session && typeof level === "number" && Number.isInteger(level)) {
        void this.save(session, { level });
      }
      return true;
    };

    (ctx.svr as any).onUpdateAppearanceAttempt = (
      actorId: number, appearance: any, isAllowed: boolean,
    ) => {
      const profileId = this.pendingCharacterCreation.get(actorId);
      if (!isAllowed || profileId === undefined || this.creatingCharacter.has(actorId)) {
        return true;
      }
      this.creatingCharacter.add(actorId);
      void this.createCharacterFromRaceMenu(actorId, profileId, appearance, ctx);
      return true;
    };

    (ctx.svr as any).onUpdateEquipmentAttempt = (actorId: number) => {
      const session = this.sessions.get(actorId);
      if (session) void this.saveSnapshot(session, ctx);
      return true;
    };

    const listener = async (userId: number, profileId: number, roles: string[], discordId?: string) => {
      let character: StoredCharacter | undefined;
      let characterLoadFailed = false;

      try {
        const response = await ApiBridge.getCharacterApi().loadCharacter(profileId.toString()) as { data?: StoredCharacter };
        character = response.data;
      } catch (error) {
        characterLoadFailed = true;
        if (!isNotFound(error)) {
          console.error("[CharacterApi] Falha ao carregar personagem:", error);
        }
      }

      const start = settings.startPoints[randomInteger(0, settings.startPoints.length - 1)];
      const existingActorId = ctx.svr.getActorsByProfileId(profileId)[0];
      let actorId = typeof existingActorId === "number" && existingActorId !== 0 ? existingActorId : undefined;
      let reusedExistingActor = false;

      if (actorId !== undefined) {
        try {
          ctx.svr.setEnabled(actorId, true);
          reusedExistingActor = true;
        } catch (error) {
          this.log("Existing actor was unusable, creating a fresh actor", `${profileId}:${actorId.toString(16)}`);
          actorId = undefined;
        }
      }

      if (actorId === undefined) {
        actorId = ctx.svr.createActor(0, start.pos, start.angleZ, +start.worldOrCell, profileId);
      }

      let session = { userId, profileId, actorId };
      this.sessions.set(actorId, session);
      try {
        ctx.svr.setUserActor(userId, actorId);
      } catch (error) {
        this.log("User-actor attachment failed, creating a fresh actor", `${profileId}:${actorId.toString(16)}`);
        actorId = ctx.svr.createActor(0, start.pos, start.angleZ, +start.worldOrCell, profileId);
        session = { userId, profileId, actorId };
        this.sessions.set(actorId, session);
        ctx.svr.setUserActor(userId, actorId);
      }
      mp.set(actorId, "consoleCommandsAllowed", settings.adminProfileIds.includes(profileId));

      if (character) {
        this.hydrate(actorId, character, mp);
        ctx.svr.setEnabled(actorId, true);
      } else if (characterLoadFailed && reusedExistingActor) {
        this.log("Character API unavailable, reusing existing actor", actorId.toString(16));
        ctx.svr.setEnabled(actorId, true);
      } else {
        this.pendingCharacterCreation.set(actorId, profileId);
        ctx.svr.setRaceMenuOpen(actorId, true);
      }

      mp.set(actorId, "private.discordRoles", roles);
      if (discordId !== undefined) mp.set(actorId, "private.indexed.discordId", discordId);
    };

    ctx.gm.on("spawnAllowed", listener);
    (ctx.svr as any)._onSpawnAllowed = listener;
  }

  async updateAsync(ctx: SystemContext): Promise<void> {
    const now = Date.now();
    if (now - this.lastPeriodicSaveAt < 10_000) return;
    this.lastPeriodicSaveAt = now;
    await Promise.all([...this.sessions.values()].map(session => this.saveSnapshot(session, ctx)));
  }

  disconnect(userId: number, ctx: SystemContext): void {
    const actorId = ctx.svr.getUserActor(userId);
    const session = this.sessions.get(actorId);
    if (session) {
      // Capture before destruction; the asynchronous Mongo write no longer
      // needs the actor, therefore ChangeForms cannot become the source.
      void this.saveSnapshot(session, ctx);
      this.sessions.delete(actorId);
      this.pendingCharacterCreation.delete(actorId);
      this.creatingCharacter.delete(actorId);
      ctx.svr.destroyActor(actorId);
    }
  }

  private hydrate(actorId: number, character: StoredCharacter, mp: Mp): void {
    if (character.appearance && typeof character.appearance === "object") {
      mp.set(actorId, "appearance", character.appearance);
    }
    if (isInventory(character.inventory)) mp.set(actorId, "inventory", character.inventory);
    if (character.position && character.rotation && character.world) {
      mp.set(actorId, "locationalData", {
        cellOrWorldDesc: normalizeWorldDesc(character.cell ?? character.world),
        pos: [character.position.x, character.position.y, character.position.z],
        rot: [character.rotation.x, character.rotation.y, character.rotation.z],
      });
    }
    mp.set(actorId, "percentages", {
      health: clampPercentage(character.health),
      magicka: clampPercentage(character.magicka),
      stamina: clampPercentage(character.stamina),
    });
    mp.set(actorId, "mongoPlayerLevel", character.level ?? 1);
  }

  private async createCharacterFromRaceMenu(actorId: number, profileId: number, appearance: any, ctx: SystemContext): Promise<void> {
    try {
      const name = typeof appearance?.name === "string" && appearance.name.trim()
        ? appearance.name.trim() : `Adventurer-${profileId}`;
      const result = await ApiBridge.getCharacterApi().createCharacter({
        accountId: profileId.toString(), profileId, name,
        race: String(appearance?.raceId ?? 0),
        sex: appearance?.isFemale ? "female" : "male", appearance,
        weight: typeof appearance?.weight === "number" ? appearance.weight : 0,
      });
      this.pendingCharacterCreation.delete(actorId);
      this.creatingCharacter.delete(actorId);
      const character = result?.data as StoredCharacter | undefined;
      if (character) this.hydrate(actorId, character, ctx.svr as unknown as Mp);
      ctx.svr.setEnabled(actorId, true);
      this.log("Character created from Mongo session", profileId);
    } catch (error) {
      this.creatingCharacter.delete(actorId);
      console.error("[CharacterApi] Falha ao criar personagem após RaceMenu:", error);
      ctx.svr.setRaceMenuOpen(actorId, true);
    }
  }

  private async saveSnapshot(session: Session, ctx: SystemContext): Promise<void> {
    const mp = ctx.svr as unknown as Mp;
    const location = mp.get(session.actorId, "locationalData");
    const percentages = mp.get(session.actorId, "percentages");
    await this.save(session, {
      position: vector(location?.pos), rotation: vector(location?.rot),
      world: worldIdFromDesc(location?.cellOrWorldDesc),
      cell: cellFromDesc(location?.cellOrWorldDesc),
      health: percentageToStored(percentages?.health),
      magicka: percentageToStored(percentages?.magicka),
      stamina: percentageToStored(percentages?.stamina),
      appearance: mp.get(session.actorId, "appearance"),
      inventory: mp.get(session.actorId, "inventory"),
      equipment: mp.get(session.actorId, "equipment"),
    });
  }

  private async save(session: Session, data: SaveCharacterRequest): Promise<void> {
    try {
      await ApiBridge.getCharacterApi().saveCharacter(session.profileId, data);
    } catch (error) {
      console.error(`[CharacterApi] Falha ao salvar profile ${session.profileId}:`, error);
    }
  }
}

function isNotFound(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 404;
}
function isInventory(value: unknown): boolean {
  return !!value && typeof value === "object" && Array.isArray((value as { entries?: unknown }).entries);
}
function vector(value: unknown): { x: number; y: number; z: number } | undefined {
  if (!Array.isArray(value) || value.length !== 3 || value.some(v => typeof v !== "number")) return undefined;
  return { x: value[0], y: value[1], z: value[2] };
}
function clampPercentage(value: unknown): number {
  return typeof value === "number" ? Math.max(0, Math.min(1, value > 1 ? value / 100 : value)) : 1;
}
function percentageToStored(value: unknown): number {
  return clampPercentage(value) * 100;
}

/** Accepts legacy `0x3C`, the native `3c:Skyrim.esm`, or a bad old value. */
function normalizeWorldDesc(value: unknown): string {
  if (typeof value !== "string") return "3c:Skyrim.esm";
  if (/^[0-9a-f]+:[^:]+$/i.test(value)) return value;
  if (/^0x[0-9a-f]+$/i.test(value)) return `${value.slice(2)}:Skyrim.esm`;
  if (/^[0-9a-f]+$/i.test(value)) return `${value}:Skyrim.esm`;
  return "3c:Skyrim.esm";
}
function worldIdFromDesc(value: unknown): string {
  const desc = normalizeWorldDesc(value);
  return `0x${desc.split(":", 1)[0]}`;
}
function cellFromDesc(value: unknown): string | null {
  const desc = normalizeWorldDesc(value);
  // Skyrim.esm 0x3c is the exterior world. Other descriptors retain their
  // exact native value so interiors can be restored in a later login.
  return desc.toLowerCase() === "3c:skyrim.esm" ? null : desc;
}
