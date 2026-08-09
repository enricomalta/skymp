"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarmaService = void 0;
class KarmaService {
    states = new Map();
    /**
     * Quanto maior o número, maior a criminalidade.
     */
    KARMA_PER_PK = 100;
    getState(playerId) {
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
    registerPK(playerId) {
        const state = this.getState(playerId);
        state.pkCount++;
        state.karma += this.KARMA_PER_PK;
        return state;
    }
    reduceKarma(playerId, amount) {
        const state = this.getState(playerId);
        state.karma = Math.max(0, state.karma - amount);
        return state;
    }
    clearPK(playerId) {
        const state = this.getState(playerId);
        state.pkCount = 0;
    }
}
exports.KarmaService = KarmaService;
