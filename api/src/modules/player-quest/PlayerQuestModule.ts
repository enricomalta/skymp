import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class PlayerQuestModule implements Module {

    public readonly name = "player-quest";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "PlayerQuestModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "PlayerQuestModule finalizado."
        );

    }

}