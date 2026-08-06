"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeServer = void 0;
const Logger_1 = require("../core/Logger");
const LoggerContext_1 = require("../core/types/LoggerContext");
class BridgeServer {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async start() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, "SkyMP Bridge iniciado.");
        /**
         * Na V1 ainda não existe comunicação real com o SkyMP.
         *
         * Quando uma requisição chegar, ela será encaminhada para:
         *
         * await this.bridge.dispatch(request);
         */
    }
    async stop() {
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, "SkyMP Bridge finalizado.");
    }
}
exports.BridgeServer = BridgeServer;
