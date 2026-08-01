import { IModule } from "../../core/IModule";
import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class SystemModule implements IModule {

    public readonly name = "system";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "SystemModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "SystemModule finalizado."
        );

    }

}