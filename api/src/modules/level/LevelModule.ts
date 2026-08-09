import { Module } from "../../core/Module";
import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import { LevelService } from "./LevelService";

export class LevelModule implements Module {

    public readonly name = "Level";

    private readonly levelService: LevelService;

    constructor() {

        this.levelService =
            new LevelService();

    }

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "Level System inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "Level System finalizado."
        );

    }

    public getService(): LevelService {

        return this.levelService;

    }

}