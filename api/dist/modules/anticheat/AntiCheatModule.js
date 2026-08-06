"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiCheatModule = void 0;
class AntiCheatModule {
    name = "AntiCheatModule";
    async initialize() {
        console.log("[MODULE] AntiCheatModule inicializado");
    }
    async shutdown() {
        console.log("[MODULE] AntiCheatModule finalizado");
    }
}
exports.AntiCheatModule = AntiCheatModule;
