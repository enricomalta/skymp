"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class CharacterModule {
    name = "character";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "CharacterModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "CharacterModule finalizado.");
    }
}
exports.CharacterModule = CharacterModule;
