import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import {
    DeathCause
} from "../death-penalty/types/DeathPenaltyTypes";

import {
    DeathPenaltySystem
} from "../death-penalty/DeathPenaltySystem";

import {
    WarService
} from "./services/WarService";

export class WarSystem {

    constructor(
        private readonly warService:
            WarService,

        private readonly deathPenaltySystem:
            DeathPenaltySystem
    ) {}

    public startWar(
        clanAId: string,
        clanBId: string
    ) {

        const war =
            this.warService.startWar(
                clanAId,
                clanBId
            );

        Logger.info(
            LoggerContext.GUILD,
            `Guerra iniciada entre "${clanAId}" e "${clanBId}".`
        );

        return war;

    }

    public endWar(
        clanAId: string,
        clanBId: string
    ): void {

        this.warService.endWar(
            clanAId,
            clanBId
        );

        Logger.info(
            LoggerContext.GUILD,
            `Guerra encerrada entre "${clanAId}" e "${clanBId}".`
        );

    }

    public isAtWar(
        clanAId: string,
        clanBId: string
    ): boolean {

        return this.warService.isAtWar(
            clanAId,
            clanBId
        );

    }

    public isWarEnemyVisible(
        viewerClanId: string,
        targetClanId: string
    ): boolean {

        return this.warService.isWarEnemyVisible(
            viewerClanId,
            targetClanId
        );

    }

    public async handleDeath(
        characterId: string
    ) {

        const result =
            await this.deathPenaltySystem.applyDeathPenalty(
                characterId,
                DeathCause.WAR
            );

        Logger.warn(
            LoggerContext.PLAYER,
            `Personagem "${characterId}" morreu durante uma guerra.`,
            result
        );

        return result;

    }

}