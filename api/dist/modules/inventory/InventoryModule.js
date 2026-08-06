"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class InventoryModule {
    name = "inventory";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "InventoryModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "InventoryModule finalizado.");
    }
}
exports.InventoryModule = InventoryModule;
