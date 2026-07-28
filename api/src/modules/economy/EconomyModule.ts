import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class EconomyModule implements Module {

    public readonly name = "economy";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "EconomyModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "EconomyModule finalizado."
        );

    }

}