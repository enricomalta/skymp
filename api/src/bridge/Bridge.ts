import { Logger } from "../core/Logger";
import { LoggerContext } from "../core/types/LoggerContext";

import { BridgeServer } from "./BridgeServer";
import { SkyMpBridge } from "./SkyMpBridge";

import { CharacterHandler } from "./handlers/CharacterHandler";

export class Bridge {

    private readonly server = new BridgeServer();

    private readonly bridge = new SkyMpBridge();

    public async start(): Promise<void> {

        this.registerHandlers();

        await this.server.start();

        Logger.info(
            LoggerContext.SYSTEM,
            "Bridge inicializado."
        );

    }

    public async stop(): Promise<void> {

        await this.server.stop();

        Logger.info(
            LoggerContext.SYSTEM,
            "Bridge finalizado."
        );

    }

    private registerHandlers(): void {

        this.bridge.register(

            new CharacterHandler()

        );

    }

}