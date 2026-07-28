import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class QuestModule implements Module {

    public readonly name = "quest";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "QuestModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "QuestModule finalizado."
        );

    }

}