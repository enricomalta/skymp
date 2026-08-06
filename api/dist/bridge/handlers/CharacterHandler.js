"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterHandler = void 0;
const CharacterService_1 = require("../../modules/characters/CharacterService");
class CharacterHandler {
    action = "character.load";
    characterService = new CharacterService_1.CharacterService();
    async handle(request) {
        try {
            const { characterId } = request.payload;
            const character = await this.characterService.findById(characterId);
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
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error
                    ? error.message
                    : "Erro interno."
            };
        }
    }
}
exports.CharacterHandler = CharacterHandler;
