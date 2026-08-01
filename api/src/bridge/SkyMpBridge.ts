import { Logger } from "../core/Logger";
import { LoggerContext } from "../core/types/LoggerContext";

import { BridgeHandler } from "./contracts/BridgeHandler";
import { BridgeRequest } from "./contracts/BridgeRequest";
import { BridgeResponse } from "./contracts/BridgeResponse";

export class SkyMpBridge {

    private readonly handlers =
        new Map<string, BridgeHandler>();

    public register(
        handler: BridgeHandler
    ): void {

        this.handlers.set(
            handler.action,
            handler
        );

        Logger.info(
            LoggerContext.SYSTEM,
            `Bridge handler "${handler.action}" registrado.`
        );

    }

    public async dispatch(
        request: BridgeRequest
    ): Promise<BridgeResponse> {

        const handler = this.handlers.get(
            request.action
        );

        if (!handler) {

            return {

                success: false,

                error: `Handler "${request.action}" não encontrado.`

            };

        }

        return handler.handle(
            request
        );

    }

}