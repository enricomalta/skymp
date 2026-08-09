import { Logger } from "../../../core/Logger";
import { LoggerContext } from "../../../core/types/LoggerContext";

import {
    PvPStatus
} from "../types/PvPTypes";

import {
    PvPStateService
} from "./PvPStateService";

export class PKService {

    constructor(
        private readonly stateService:
            PvPStateService
    ) {}

    public shouldBecomePK(
        attackerStatus: PvPStatus,
        targetStatus: PvPStatus
    ): boolean {

        return (
            attackerStatus ===
                PvPStatus.PURPLE &&
            targetStatus ===
                PvPStatus.WHITE
        ) ||
        (
            attackerStatus ===
                PvPStatus.WHITE &&
            targetStatus ===
                PvPStatus.WHITE
        );

    }

    public applyPK(
        characterId: string
    ): void {

        this.stateService.setRed(
            characterId
        );

        Logger.warn(
            LoggerContext.PLAYER,
            `Personagem "${characterId}" tornou-se PK.`
        );

    }

}