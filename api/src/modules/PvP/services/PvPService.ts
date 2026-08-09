import { Logger } from "../../../core/Logger";
import { LoggerContext } from "../../../core/types/LoggerContext";

import {
    AttackResult,
    CombatType,
    KillResult,
    PvPStatus
} from "../types/PvPTypes";

import {
    PvPStateService
} from "./PvPStateService";

import {
    PvPPointService
} from "./PvPPointService";

import {
    PKService
} from "./PKService";

import {
    WarService
} from "./WarService";

export class PvPService {

    public static readonly PURPLE_DURATION_MS =
        60_000;

    constructor(
        private readonly stateService:
            PvPStateService,

        private readonly pvpPointService:
            PvPPointService,

        private readonly pkService:
            PKService,

        private readonly warService:
            WarService
    ) {}

    public attack(
        attackerId: string,
        targetId: string,
        attackerClanId: string | null = null,
        targetClanId: string | null = null
    ): AttackResult {

        if (
            attackerId === targetId
        ) {

            throw new Error(
                "Um jogador nao pode atacar a si mesmo."
            );

        }

        const attacker =
            this.stateService.getState(
                attackerId
            );

        const target =
            this.stateService.getState(
                targetId
            );

        const isWar =
            attackerClanId !== null &&
            targetClanId !== null &&
            this.warService.isAtWar(
                attackerClanId,
                targetClanId
            );

        if (isWar) {

            return {

                attackerId,

                targetId,

                combatType:
                    CombatType.WAR,

                attackerStatus:
                    attacker.status,

                targetStatus:
                    target.status,

                attackerCanAttack:
                    true,

                attackerBecomesPurple:
                    false

            };

        }

        /*
         * Atacar um PK nunca transforma
         * o atacante em Purple.
         */
        if (
            target.status ===
            PvPStatus.RED
        ) {

            return {

                attackerId,

                targetId,

                combatType:
                    CombatType.PVP,

                attackerStatus:
                    attacker.status,

                targetStatus:
                    target.status,

                attackerCanAttack:
                    true,

                attackerBecomesPurple:
                    false

            };

        }

        /*
         * Atacar qualquer jogador envolvido
         * em PvP normal coloca o atacante
         * em Purple.
         */
        this.stateService.setPurple(
            attackerId,
            PvPService.PURPLE_DURATION_MS
        );

        const combatType =
            target.status ===
            PvPStatus.PURPLE

                ? CombatType.PVP

                : CombatType.PVP;

        Logger.debug(
            LoggerContext.PLAYER,
            `PvP iniciado entre "${attackerId}" e "${targetId}".`
        );

        return {

            attackerId,

            targetId,

            combatType,

            attackerStatus:
                this.stateService
                    .getState(attackerId)
                    .status,

            targetStatus:
                target.status,

            attackerCanAttack:
                true,

            attackerBecomesPurple:
                true

        };

    }

    public resolveKill(
        killerId: string,
        victimId: string,
        killerClanId: string | null = null,
        victimClanId: string | null = null
    ): KillResult {

        const killer =
            this.stateService.getState(
                killerId
            );

        const victim =
            this.stateService.getState(
                victimId
            );

        const isWar =
            killerClanId !== null &&
            victimClanId !== null &&
            this.warService.isAtWar(
                killerClanId,
                victimClanId
            );

        if (isWar) {

            return {

                killerId,

                victimId,

                combatType:
                    CombatType.WAR,

                killerStatus:
                    killer.status,

                pvpPointsGained:
                    0,

                becamePK:
                    false

            };

        }

        /*
         * Matar um PK não gera PK.
         */
        if (
            victim.status ===
            PvPStatus.RED
        ) {

            return {

                killerId,

                victimId,

                combatType:
                    CombatType.PVP,

                killerStatus:
                    killer.status,

                pvpPointsGained:
                    0,

                becamePK:
                    false

            };

        }

        /*
         * Purple contra Purple:
         * vitória PvP sem PK.
         */
        if (
            killer.status ===
                PvPStatus.PURPLE &&
            victim.status ===
                PvPStatus.PURPLE
        ) {

            this.pvpPointService.addPoint(
                killerId
            );

            return {

                killerId,

                victimId,

                combatType:
                    CombatType.PVP,

                killerStatus:
                    killer.status,

                pvpPointsGained:
                    1,

                becamePK:
                    false

            };

        }

        /*
         * Matar jogador White:
         * PK.
         */
        if (
            victim.status ===
            PvPStatus.WHITE
        ) {

            this.pkService.applyPK(
                killerId
            );

            return {

                killerId,

                victimId,

                combatType:
                    CombatType.PK,

                killerStatus:
                    PvPStatus.RED,

                pvpPointsGained:
                    0,

                becamePK:
                    true

            };

        }

        return {

            killerId,

            victimId,

            combatType:
                CombatType.NONE,

            killerStatus:
                killer.status,

            pvpPointsGained:
                0,

            becamePK:
                false

        };

    }

}