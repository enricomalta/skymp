import { Logger } from "../core/Logger";
import { LoggerContext } from "../core/types/LoggerContext";

import { SkyMpBridge } from "./SkyMpBridge";

export class BridgeServer {

    constructor(

        private readonly bridge: SkyMpBridge

    ) {}

    public async start(): Promise<void> {

        Logger.info(
            LoggerContext.SYSTEM,
            "SkyMP Bridge iniciado."
        );

        /**
         * Na V1 ainda não existe comunicação real com o SkyMP.
         *
         * Quando uma requisição chegar, ela será encaminhada para:
         *
         * await this.bridge.dispatch(request);
         */

    }

    public async stop(): Promise<void> {

        Logger.info(
            LoggerContext.SYSTEM,
            "SkyMP Bridge finalizado."
        );

    }

}