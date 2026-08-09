import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import {
    DeathCause,
    DeathPenaltyPolicy,
    DeathPenaltyResult
} from "./types/DeathPenaltyTypes";

import {
    DeathPenaltyService
} from "./DeathPenaltyService";

export class DeathPenaltySystem
    implements Module {

    public readonly name =
        "DeathPenalty";

    private readonly service:
        DeathPenaltyService;

    constructor() {

        this.service =
            new DeathPenaltyService();

    }

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "DeathPenaltySystem inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "DeathPenaltySystem finalizado."
        );

    }

    public async applyDeathPenalty(
        characterId: string,
        cause: DeathCause
    ): Promise<DeathPenaltyResult> {

        return this.service.applyDeathPenalty(
            characterId,
            cause
        );

    }

    public getPolicy(
        cause: DeathCause
    ): DeathPenaltyPolicy {

        return this.service.getPolicy(
            cause
        );

    }

    public getService():
        DeathPenaltyService {

        return this.service;

    }

}