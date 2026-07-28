import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class NpcModule implements Module {

    public readonly name = "npc";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "NpcModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "NpcModule finalizado."
        );

    }

}