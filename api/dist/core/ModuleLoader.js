"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleLoader = void 0;
const Logger_1 = require("./Logger");
const LoggerContext_1 = require("./types/LoggerContext");
class ModuleLoader {
    modules = [];
    register(module) {
        const exists = this.modules.some(current => current.name === module.name);
        if (exists) {
            throw new Error(`O modulo "${module.name}" ja foi registrado.`);
        }
        this.modules.push(module);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, `Modulo "${module.name}" registrado.`);
    }
    async initialize() {
        for (const module of this.modules) {
            Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, `Inicializando modulo "${module.name}".`);
            await module.initialize();
        }
    }
    async shutdown() {
        for (const module of [...this.modules].reverse()) {
            Logger_1.Logger.info(LoggerContext_1.LoggerContext.MODULE, `Finalizando modulo "${module.name}".`);
            await module.shutdown();
        }
    }
    getModules() {
        return this.modules;
    }
}
exports.ModuleLoader = ModuleLoader;
