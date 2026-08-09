import { Module } from "../../core/Module";

import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import {
    PvPStateService
} from "./services/PvPStateService";

import {
    PvPPointService
} from "./services/PvPPointService";

import {
    PKService
} from "./services/PKService";

import {
    WarService
} from "./services/WarService";

import {
    PvPService
} from "./services/PvPService";

import {
    DeathPenaltySystem
} from "../death-penalty/DeathPenaltySystem";

import {
    PKSystem
} from "./PKSystem";

import {
    RedSkullSystem
} from "./RedSkullSystem";

import {
    WarSystem
} from "./WarSystem";

export class PvPSystem implements Module {

    public readonly name =
        "PvP";

    private readonly stateService:
        PvPStateService;

    private readonly pvpPointService:
        PvPPointService;

    private readonly pkService:
        PKService;

    private readonly warService:
        WarService;

    private readonly redSkullSystem:
        RedSkullSystem;

    private readonly pkSystem:
        PKSystem;

    private readonly warSystem:
        WarSystem;

    private readonly pvpService:
        PvPService;

    constructor(
        deathPenaltySystem:
            DeathPenaltySystem
    ) {

        this.stateService =
            new PvPStateService();

        this.pvpPointService =
            new PvPPointService(
                this.stateService
            );

        this.pkService =
            new PKService(
                this.stateService
            );

        this.warService =
            new WarService();

        this.redSkullSystem =
            new RedSkullSystem(
                this.stateService
            );

        this.pkSystem =
            new PKSystem(
                this.stateService,
                this.pkService,
                deathPenaltySystem,
                this.redSkullSystem
            );

        this.warSystem =
            new WarSystem(
                this.warService,
                deathPenaltySystem
            );

        this.pvpService =
            new PvPService(
                this.stateService,
                this.pvpPointService,
                this.pkService,
                this.warService,
                deathPenaltySystem
            );

    }

    public async initialize(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "PvP System inicializado."
        );

    }

    public async shutdown(): Promise<void> {

        Logger.info(
            LoggerContext.MODULE,
            "PvP System finalizado."
        );

    }

    public getService():
        PvPService {

        return this.pvpService;

    }

    public getStateService():
        PvPStateService {

        return this.stateService;

    }

    public getWarService():
        WarService {

        return this.warService;

    }

    public getPKSystem():
        PKSystem {

        return this.pkSystem;

    }

    public getRedSkullSystem():
        RedSkullSystem {

        return this.redSkullSystem;

    }

    public getWarSystem():
        WarSystem {

        return this.warSystem;

    }

}