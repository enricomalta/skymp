import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import {
    PvPStateService
} from "./services/PvPStateService";

import {
    KarmaService
} from "./KarmaSystem";

interface PKEvent {

    victimId: string | null;

    timestamp: number;

}

export class RedSkullSystem {

    public static readonly WINDOW_MS =
        10 * 60 * 1000;

    public static readonly MAX_PK_EVENTS =
        5;

    public static readonly MAX_SAME_VICTIM_EVENTS =
        3;

    private readonly events =
        new Map<string, PKEvent[]>();

    private readonly karmaService:
        KarmaService;

    constructor(
        private readonly stateService:
            PvPStateService
    ) {

        this.karmaService =
            new KarmaService();

    }

    public registerPKKill(
        killerId: string,
        victimId: string | null
    ): void {

        const now =
            Date.now();

        const events =
            this.events.get(
                killerId
            ) ?? [];

        const recentEvents =
            events.filter(
                event =>
                    now -
                    event.timestamp <=
                    RedSkullSystem.WINDOW_MS
            );

        recentEvents.push({

            victimId,

            timestamp:
                now

        });

        this.events.set(
            killerId,
            recentEvents
        );

        this.karmaService.registerPK(
            killerId
        );

        const totalPKs =
            recentEvents.length;

        const sameVictimPKs =
            victimId === null

                ? 0

                : recentEvents.filter(
                    event =>
                        event.victimId ===
                        victimId
                ).length;

        if (
            totalPKs >=
            RedSkullSystem.MAX_PK_EVENTS
            ||
            sameVictimPKs >=
            RedSkullSystem.MAX_SAME_VICTIM_EVENTS
        ) {

            this.applyRedSkull(
                killerId
            );

        }

    }

    public applyRedSkull(
        characterId: string
    ): void {

        const state =
            this.karmaService.getState(
                characterId
            );

        state.redSkull =
            true;

        this.stateService.setRed(
            characterId
        );

        Logger.warn(
            LoggerContext.PLAYER,
            `Personagem "${characterId}" recebeu Red Skull.`
        );

    }

    public isRedSkull(
        characterId: string
    ): boolean {

        return this.karmaService
            .getState(
                characterId
            )
            .redSkull;

    }

    public getCriminalState(
        characterId: string
    ) {

        return this.karmaService.getState(
            characterId
        );

    }

}