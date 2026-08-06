"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyMpBridge = void 0;
const Logger_1 = require("../core/Logger");
const LoggerContext_1 = require("../core/types/LoggerContext");
class SkyMpBridge {
    handlers = new Map();
    register(handler) {
        this.handlers.set(handler.action, handler);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, `Bridge handler "${handler.action}" registrado.`);
    }
    async dispatch(request) {
        const handler = this.handlers.get(request.action);
        if (!handler) {
            return {
                success: false,
                error: `Handler "${request.action}" não encontrado.`
            };
        }
        return handler.handle(request);
    }
}
exports.SkyMpBridge = SkyMpBridge;
