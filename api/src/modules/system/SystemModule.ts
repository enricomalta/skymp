import { Module } from "../../core/Module";
import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class SystemModule implements Module {

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