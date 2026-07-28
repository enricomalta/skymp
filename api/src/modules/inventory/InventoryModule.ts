import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";


export class InventoryModule implements Module {

    public readonly name = "inventory";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "InventoryModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "InventoryModule finalizado."
        );

    }

}