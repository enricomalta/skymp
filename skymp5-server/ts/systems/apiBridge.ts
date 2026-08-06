import { System, SystemContext } from "./system";

import { ApiClient } from "../api/ApiClient";
import { CharacterApi } from "../api/CharacterApi";

interface HealthResponse {

    status: string;

}

export class ApiBridge implements System {

    public systemName = "ApiBridge";

    private static client: ApiClient;

    private static characterApi: CharacterApi;

    public static getClient(): ApiClient {

        if (!ApiBridge.client) {

            throw new Error(
                "ApiBridge ainda não foi inicializado."
            );

        }

        return ApiBridge.client;

    }

    public static getCharacterApi(): CharacterApi {

        if (!ApiBridge.characterApi) {

            throw new Error(
                "CharacterApi ainda não foi inicializado."
            );

        }

        return ApiBridge.characterApi;

    }

    public async initAsync(
        ctx: SystemContext
    ): Promise<void> {

        ApiBridge.client = new ApiClient(
            "http://localhost:3001"
        );

        ApiBridge.characterApi = new CharacterApi(
            ApiBridge.client
        );

        console.log("[ApiBridge] Inicializado.");

        try {

            const response =
                await ApiBridge.client.get<HealthResponse>(
                    "/system/health"
                );

            console.log(
                `[ApiBridge] API respondeu: ${response.status}`
            );

        } catch (error) {

            console.error(
                "[ApiBridge] Falha ao conectar na API."
            );

            console.error(error);

        }

    }

}