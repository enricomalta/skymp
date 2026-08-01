import { BridgeHandler } from "../contracts/BridgeHandler";
import { BridgeRequest } from "../contracts/BridgeRequest";
import { BridgeResponse } from "../contracts/BridgeResponse";

import { CharacterService } from "../../modules/characters/CharacterService";

export class CharacterHandler implements BridgeHandler {

    public readonly action = "character.load";

    private readonly characterService = new CharacterService();

    public async handle(
        request: BridgeRequest
    ): Promise<BridgeResponse> {

        try {

            const { characterId } = request.payload as {

                characterId: string;

            };

            const character = await this.characterService.findById(
                characterId
            );

            if (!character) {

                return {

                    success: false,

                    error: "Personagem não encontrado."

                };

            }

            return {

                success: true,

                data: character

            };

        } catch (error) {

            return {

                success: false,

                error: error instanceof Error
                    ? error.message
                    : "Erro interno."

            };

        }

    }

}