import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class ItemModule implements Module {

    public readonly name = "item";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "ItemModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "ItemModule finalizado."
        );

    }

}