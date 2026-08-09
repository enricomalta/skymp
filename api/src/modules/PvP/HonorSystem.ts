import { PlayerHonor } from "./types/PvPTypes";

export enum HonorReason {
    KILL_PK = "kill_pk",
    WAR_KILL = "war_kill",
    WAR_VICTORY = "war_victory",
    PVP_ACHIEVEMENT = "pvp_achievement"
}

export class HonorService {

    private honors = new Map<string, PlayerHonor>();

    getHonor(playerId: string): PlayerHonor {

        let honor = this.honors.get(playerId);

        if (!honor) {

            honor = {
                playerId,
                points: 0
            };

            this.honors.set(
                playerId,
                honor
            );
        }

        return honor;
    }

    addHonor(
        playerId: string,
        amount: number,
        reason: HonorReason
    ): PlayerHonor {

        const honor = this.getHonor(playerId);

        honor.points += amount;

        console.log(
            `[HONOR] ${playerId} recebeu ${amount} de honra. Motivo: ${reason}`
        );

        return honor;
    }

    getPoints(playerId: string): number {
        return this.getHonor(playerId).points;
    }
}