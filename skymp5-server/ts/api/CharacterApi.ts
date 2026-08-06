import { ApiClient } from "./ApiClient";

export interface CreateCharacterRequest {

    accountId: string;

    profileId: number;

    name: string;

    race: string;

    sex: "male" | "female";

    appearance: unknown;

    weight: number;

}

export interface SaveCharacterRequest {
    level?: number;
    position?: { x: number; y: number; z: number; };
    rotation?: { x: number; y: number; z: number; };
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

}

export class CharacterApi {

    constructor(
        private readonly api: ApiClient
    ) { }

    public async createCharacter(
        request: CreateCharacterRequest
    ): Promise<any> {

        return this.api.post(
            "/characters/create",
            request
        );

    }

    public async loadCharacter(
        accountId: string
    ): Promise<any> {

        return this.api.get(
            `/characters/load/${accountId}`
        );

    }

    public async saveCharacter(
        profileId: number,
        request: SaveCharacterRequest
    ): Promise<any> {

        return this.api.put(
            `/characters/save/${profileId}`,
            request
        );

    }

}
