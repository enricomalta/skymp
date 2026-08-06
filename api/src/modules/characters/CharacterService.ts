import { CharacterBootstrap } from "./bootstrap/CharacterBootstrap";
import { CharacterRepository } from "./CharacterRepository";

import { Character } from "./models/Character";
import { CreateCharacterDto } from "./dto/CreateCharacterDto";
import { SaveCharacterDto } from "./dto/SaveCharacterDto";

export class CharacterService {

    private readonly repository = new CharacterRepository();
    private readonly bootstrap = new CharacterBootstrap();

    public async createCharacter(
        dto: CreateCharacterDto
    ): Promise<Character> {

        const exists = await this.repository.findByName(
            dto.name
        );

        if (exists) {

            throw new Error(
                "Já existe um personagem com esse nome."
            );

        }

        const character = await this.repository.create({

            accountId: dto.accountId,

            profileId: dto.profileId,

            name: dto.name,

            race: dto.race,

            sex: dto.sex,

            level: 1,

            position: {

                x: 22627,

                y: -8694,

                z: -3595

            },

            rotation: {

                x: 0,

                y: 0,

                z: 0

            },

            world: "0x3C",

            cell: null,

            health: 100,

            magicka: 100,

            stamina: 100,

            gold: 0,

            experience: 0,

            appearance: dto.appearance,

            inventory: dto.inventory ?? { entries: [] },

            equipment: dto.equipment,

            skills: dto.skills,

            attributes: dto.attributes,

            stats: dto.stats,

            quests: dto.quests,

            factions: dto.factions,

            location: dto.location,

            isDead: dto.isDead,

            jail: dto.jail,

            housing: dto.housing,

            bank: dto.bank,

            weight: dto.weight,

            maxWeight: dto.maxWeight,

            reputation: dto.reputation,

            skillPoints: dto.skillPoints,

            perkPoints: dto.perkPoints,

            lastSave: new Date(),

            lastLogin: null,

            lastLogout: null

        });

        return character;

    }

    public async findById(
        id: string
    ): Promise<Character | null> {

        return this.repository.findById(id);

    }

    public async findByAccount(
        accountId: string
    ): Promise<Character[]> {

        return this.repository.findByAccount(accountId);

    }

    public async findByProfileId(
        profileId: number
    ): Promise<Character | null> {

        return this.repository.findByProfileId(profileId);

    }

    public async loadCharacter(
        profileId: number
    ): Promise<Character | null> {

        return this.repository.findByProfileId(profileId);

    }

    public async saveCharacter(
        id: string,
        dto: SaveCharacterDto
    ): Promise<Character> {

        const character = await this.repository.findById(id);

        if (!character) {

            throw new Error(
                "Personagem não encontrado."
            );

        }

        Object.assign(
            character,
            dto
        );

        character.lastSave = new Date();

        return this.repository.save(
            character
        );

    }

    /**
     * SkyMP identifies a player by its master profile id.  This is the only
     * update path used by the game server, so Mongo is the source of truth
     * for player state rather than the native ChangeForm id.
     */
    public async saveCharacterByProfileId(
        profileId: number,
        dto: Partial<SaveCharacterDto> & { level?: number }
    ): Promise<Character> {

        const character = await this.repository.findByProfileId(profileId);

        if (!character) {
            throw new Error("Personagem não encontrado.");
        }

        Object.assign(character, dto);
        character.lastSave = new Date();

        return this.repository.save(character);
    }
}
