import { ApiClient } from "./ApiClient";

export interface CreateCharacterRequest {

    accountId: string;

    name: string;

    race: string;

}

export interface SaveCharacterRequest {

    accountId: string;

    position: {

        x: number;

        y: number;

        z: number;

    };

    rotation: {

        x: number;

        y: number;

        z: number;

    };

    level: number;

    health: number;

    magicka: number;

    stamina: number;

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
        request: SaveCharacterRequest
    ): Promise<any> {

        return this.api.put(
            "/characters/save",
            request
        );

    }

}