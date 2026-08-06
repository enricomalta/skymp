"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
const Logger_1 = require("../core/Logger");
const LoggerContext_1 = require("../core/types/LoggerContext");
const BridgeServer_1 = require("./BridgeServer");
const SkyMpBridge_1 = require("./SkyMpBridge");
const CharacterHandler_1 = require("./handlers/CharacterHandler");
class Bridge {
    server = new BridgeServer_1.BridgeServer();
    bridge = new SkyMpBridge_1.SkyMpBridge();
    async start() {
        this.registerHandlers();
        await this.server.start();
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, "Bridge inicializado.");
    }
    async stop() {
        await this.server.stop();
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, "Bridge finalizado.");
    }
    registerHandlers() {
        this.bridge.register(new CharacterHandler_1.CharacterHandler());
    }
}
exports.Bridge = Bridge;
