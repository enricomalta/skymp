"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQuestModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class PlayerQuestModule {
    name = "player-quest";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "PlayerQuestModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "PlayerQuestModule finalizado.");
    }
}
exports.PlayerQuestModule = PlayerQuestModule;
