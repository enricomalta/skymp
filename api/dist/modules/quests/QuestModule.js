"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class QuestModule {
    name = "quest";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "QuestModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "QuestModule finalizado.");
    }
}
exports.QuestModule = QuestModule;
