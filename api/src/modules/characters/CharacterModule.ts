import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class CharacterModule implements Module {

    public readonly name = "character";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "CharacterModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "CharacterModule finalizado."
        );

    }

}