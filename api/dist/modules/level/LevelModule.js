"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelModule = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
const LevelService_1 = require("./LevelService");
class LevelModule {
    name = "Level";
    levelService;
    constructor() {
        this.levelService =
            new LevelService_1.LevelService();
    }
    async initialize() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "Level System inicializado.");
    }
    async shutdown() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, "Level System finalizado.");
    }
    getService() {
        return this.levelService;
    }
}
exports.LevelModule = LevelModule;
