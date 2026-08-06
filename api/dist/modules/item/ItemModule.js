"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
class ItemModule {
    name = "item";
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "ItemModule inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "ItemModule finalizado.");
    }
}
exports.ItemModule = ItemModule;
