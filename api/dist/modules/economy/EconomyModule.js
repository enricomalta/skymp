"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class EconomyModule {
    name = "economy";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "EconomyModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "EconomyModule finalizado.");
    }
}
exports.EconomyModule = EconomyModule;
