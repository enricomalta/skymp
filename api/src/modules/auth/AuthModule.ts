import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

export class AuthModule implements Module {

    public readonly name = "auth";

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "AuthModule inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "AuthModule finalizado."
        );

    }

}