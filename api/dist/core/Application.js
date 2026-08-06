"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const app_1 = __importDefault(require("../app"));
const Config_1 = require("../config/Config");
const connection_1 = require("../database/connection");
const Logger_1 = require("../core/Logger");
const LoggerContext_1 = require("./types/LoggerContext");
const ModuleLoader_1 = require("./ModuleLoader");
// Module 
const SystemModule_1 = require("../modules/system/SystemModule");
const AuthModule_1 = require("../modules/auth/AuthModule");
const CharacterModule_1 = require("../modules/characters/CharacterModule");
const InventoryModule_1 = require("../modules/inventory/InventoryModule");
const ItemModule_1 = require("../modules/item/ItemModule");
const EconomyModule_1 = require("../modules/economy/EconomyModule");
const NpcModule_1 = require("../modules/npcs/NpcModule");
const QuestModule_1 = require("../modules/quests/QuestModule");
const PlayerQuestModule_1 = require("../modules/player-quest/PlayerQuestModule");
const AntiCheatModule_1 = require("../modules/anticheat/AntiCheatModule");
const Bridge_1 = require("../bridge/Bridge");
/*
Uma observação importante para nossa arquitetura

Percebi um ponto que devemos corrigir futuramente, antes de avançar para mais módulos.

Hoje a Application precisa conhecer todos os módulos:

new AuthModule();
new CharacterModule();
new InventoryModule();

Isso significa que, a cada novo módulo (Economy, Guild, Quest, House...), teremos que modificar a Application.
Isso cria um acoplamento desnecessário.

A solução continua compatível com a arquitetura da Foundation: criar uma classe responsável apenas pelo
registro dos módulos, por exemplo ModuleRegistry, deixando a Application sem conhecer nenhum módulo específico.

Mas eu não vou implementar isso agora, porque não mudaremos a arquitetura durante a sprint.
Apenas estou registrando essa observação para fazermos uma pequena refatoração ao final da Sprint
Core Gameplay, antes de começarmos os módulos mais avançados.
Ela não muda nenhuma API pública e deixará a arquitetura mais limpa.
*/
class Application {
    moduleLoader = new ModuleLoader_1.ModuleLoader();
    bridge = new Bridge_1.Bridge();
    async initializeModules() {
        this.moduleLoader.register(new AuthModule_1.AuthModule());
        this.moduleLoader.register(new CharacterModule_1.CharacterModule());
        this.moduleLoader.register(new InventoryModule_1.InventoryModule());
        this.moduleLoader.register(new ItemModule_1.ItemModule());
        this.moduleLoader.register(new EconomyModule_1.EconomyModule());
        this.moduleLoader.register(new NpcModule_1.NpcModule());
        this.moduleLoader.register(new QuestModule_1.QuestModule());
        this.moduleLoader.register(new PlayerQuestModule_1.PlayerQuestModule());
        this.moduleLoader.register(new SystemModule_1.SystemModule());
        this.moduleLoader.register(new AntiCheatModule_1.AntiCheatModule());
        await this.moduleLoader.initialize();
    }
    async start() {
        await this.initializeDatabase();
        await this.initializeModules();
        await this.bridge.start();
        this.startHttp();
    }
    async initializeDatabase() {
        await (0, connection_1.connectDatabase)();
    }
    startHttp() {
        const port = Number(Config_1.Config.server.port) || 3000;
        app_1.default.listen(port, () => {
            Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, `Terras Alem Core iniciado na porta ${port}`);
        });
    }
}
exports.Application = Application;
