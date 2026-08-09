"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HonorService = exports.HonorReason = void 0;
var HonorReason;
(function (HonorReason) {
    HonorReason["KILL_PK"] = "kill_pk";
    HonorReason["WAR_KILL"] = "war_kill";
    HonorReason["WAR_VICTORY"] = "war_victory";
    HonorReason["PVP_ACHIEVEMENT"] = "pvp_achievement";
})(HonorReason || (exports.HonorReason = HonorReason = {}));
class HonorService {
    honors = new Map();
    getHonor(playerId) {
        let honor = this.honors.get(playerId);
        if (!honor) {
            honor = {
                playerId,
                points: 0
            };
            this.honors.set(playerId, honor);
        }
        return honor;
    }
    addHonor(playerId, amount, reason) {
        const honor = this.getHonor(playerId);
        honor.points += amount;
        console.log(`[HONOR] ${playerId} recebeu ${amount} de honra. Motivo: ${reason}`);
        return honor;
    }
    getPoints(playerId) {
        return this.getHonor(playerId).points;
    }
}
exports.HonorService = HonorService;
