"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarService = void 0;
class WarService {
    wars = new Map();
    declareWar(clanAId, clanBId) {
        const war = {
            id: crypto.randomUUID(),
            clanAId,
            clanBId,
            startedAt: Date.now(),
            active: true
        };
        this.wars.set(war.id, war);
        return war;
    }
    endWar(warId) {
        const war = this.wars.get(warId);
        if (!war) {
            return;
        }
        war.active = false;
    }
    areAtWar(clanAId, clanBId) {
        for (const war of this.wars.values()) {
            if (!war.active) {
                continue;
            }
            const sameDirection = war.clanAId === clanAId &&
                war.clanBId === clanBId;
            const oppositeDirection = war.clanAId === clanBId &&
                war.clanBId === clanAId;
            if (sameDirection ||
                oppositeDirection) {
                return true;
            }
        }
        return false;
    }
}
exports.WarService = WarService;
