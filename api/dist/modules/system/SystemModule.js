"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class SystemModule {
    name = "system";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "SystemModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "SystemModule finalizado.");
    }
}
exports.SystemModule = SystemModule;
