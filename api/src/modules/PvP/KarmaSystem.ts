import { PlayerCriminalState } from "./types/PvPTypes";

export class KarmaService {

    private states = new Map<string, PlayerCriminalState>();

    /**
     * Quanto maior o número, maior a criminalidade.
     */
    private readonly KARMA_PER_PK = 100;

    getState(playerId: string): PlayerCriminalState {

        let state = this.states.get(playerId);

        if (!state) {

            state = {
                playerId,
                pkCount: 0,
                karma: 0,
                redSkull: false
            };

            this.states.set(playerId, state);
        }

        return state;
    }

    registerPK(playerId: string): PlayerCriminalState {

        const state = this.getState(playerId);

        state.pkCount++;

        state.karma += this.KARMA_PER_PK;

        return state;
    }

    reduceKarma(
        playerId: string,
        amount: number
    ): PlayerCriminalState {

        const state = this.getState(playerId);

        state.karma = Math.max(
            0,
            state.karma - amount
        );

        return state;
    }

    clearPK(playerId: string): void {

        const state = this.getState(playerId);

        state.pkCount = 0;
    }
}