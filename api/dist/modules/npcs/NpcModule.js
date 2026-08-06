"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class NpcModule {
    name = "npc";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "NpcModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "NpcModule finalizado.");
    }
}
exports.NpcModule = NpcModule;
