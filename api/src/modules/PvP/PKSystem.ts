import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import {
    PvPStatus
} from "./types/PvPTypes";

import {
    DeathCause
} from "../death-penalty/types/DeathPenaltyTypes";

import {
    DeathPenaltySystem
} from "../death-penalty/DeathPenaltySystem";

import {
    PvPStateService
} from "./services/PvPStateService";

import {
    PKService
} from "./services/PKService";

import {
    RedSkullSystem
} from "./RedSkullSystem";

export class PKSystem {

    constructor(
        private readonly stateService:
            PvPStateService,

        private readonly pkService:
            PKService,

        private readonly deathPenaltySystem:
            DeathPenaltySystem,

        private readonly redSkullSystem:
            RedSkullSystem
    ) {}

    public applyPK(
        characterId: string,
        victimId?: string
    ): void {

        this.pkService.applyPK(
            characterId
        );

        this.redSkullSystem.registerPKKill(
            characterId,
            victimId ?? null
        );

    }

    public shouldBecomePK(
        attackerStatus: PvPStatus,
        targetStatus: PvPStatus
    ): boolean {

        return this.pkService.shouldBecomePK(
            attackerStatus,
            targetStatus
        );

    }

    public isPK(
        characterId: string
    ): boolean {

        return this.stateService.isRed(
            characterId
        );

    }

    public isRedSkull(
        characterId: string
    ): boolean {

        return this.redSkullSystem.isRedSkull(
            characterId
        );

    }

    public async handleDeath(
        characterId: string
    ) {

        const cause =
            this.redSkullSystem.isRedSkull(
                characterId
            )

                ? DeathCause.RED_SKULL

                : DeathCause.PK;

        const result =
            await this.deathPenaltySystem.applyDeathPenalty(
                characterId,
                cause
            );

        Logger.warn(
            LoggerContext.PLAYER,
            `PK "${characterId}" morreu e recebeu penalidade.`,
            result
        );

        return result;

    }

}