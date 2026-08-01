import { System, SystemContext } from "./system";

import { ApiClient } from "../api/ApiClient";

interface HealthResponse {

    status: string;

}

export class ApiBridge implements System {

    public systemName = "ApiBridge";

    private static client: ApiClient;

    public static getClient(): ApiClient {

        if (!ApiBridge.client) {

            throw new Error(
                "ApiBridge ainda não foi inicializado."
            );

        }

        return ApiBridge.client;

    }

    public async initAsync(
        ctx: SystemContext
    ): Promise<void> {

        ApiBridge.client = new ApiClient(
            "http://localhost:3001"
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