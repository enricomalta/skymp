import {
    PvPState,
    PvPStatus
} from "../types/PvPTypes";

export class PvPStateService {

    private readonly states =
        new Map<string, PvPState>();

    public getState(
        characterId: string
    ): PvPState {

        const existing =
            this.states.get(
                characterId
            );

        if (existing) {

            this.refreshState(
                existing
            );

            return existing;

        }

        const state: PvPState = {

            characterId,

            status:
                PvPStatus.WHITE,

            purpleUntil:
                null,

            pvpPoints: 0,

            pkPoints: 0

        };

        this.states.set(
            characterId,
            state
        );

        return state;

    }

    public setPurple(
        characterId: string,
        durationMs: number
    ): PvPState {

        const state =
            this.getState(
                characterId
            );

        state.status =
            PvPStatus.PURPLE;

        state.purpleUntil =
            new Date(
                Date.now() + durationMs
            );

        return state;

    }

    public setRed(
        characterId: string
    ): PvPState {

        const state =
            this.getState(
                characterId
            );

        state.status =
            PvPStatus.RED;

        state.purpleUntil =
            null;

        return state;

    }

    public setWhite(
        characterId: string
    ): PvPState {

        const state =
            this.getState(
                characterId
            );

        state.status =
            PvPStatus.WHITE;

        state.purpleUntil =
            null;

        return state;

    }

    public isPurple(
        characterId: string
    ): boolean {

        const state =
            this.getState(
                characterId
            );

        return state.status ===
            PvPStatus.PURPLE;

    }

    public isRed(
        characterId: string
    ): boolean {

        const state =
            this.getState(
                characterId
            );

        return state.status ===
            PvPStatus.RED;

    }

    public isWhite(
        characterId: string
    ): boolean {

        const state =
            this.getState(
                characterId
            );

        return state.status ===
            PvPStatus.WHITE;

    }

    public refreshState(
        state: PvPState
    ): void {

        if (
            state.status !==
            PvPStatus.PURPLE
        ) {
            return;
        }

        if (
            !state.purpleUntil
        ) {
            state.status =
                PvPStatus.WHITE;

            return;
        }

        if (
            state.purpleUntil.getTime() <=
            Date.now()
        ) {

            state.status =
                PvPStatus.WHITE;

            state.purpleUntil =
                null;

        }

    }

}