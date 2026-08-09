export interface PvPHistory {

    playerId: string;

    kills: number;

    deaths: number;

    killsAgainstSamePlayers: number;

    killsAgainstLowerLevelPlayers: number;

    killsAgainstInactivePlayers: number;

    recentKills: number;

    recentVictims: number;
}

export class RedSkullService {

    /**
     * Avalia se o comportamento do jogador
     * apresenta indícios de power game abusivo.
     */
    evaluate(history: PvPHistory): boolean {

        let score = 0;

        /**
         * Muitas mortes recentes.
         */
        if (history.recentKills >= 20) {
            score += 20;
        }

        /**
         * Mata repetidamente as mesmas pessoas.
         */
        if (history.killsAgainstSamePlayers >= 10) {
            score += 30;
        }

        /**
         * Abusa de jogadores muito inferiores.
         */
        if (history.killsAgainstLowerLevelPlayers >= 15) {
            score += 25;
        }

        /**
         * Mata jogadores que praticamente não
         * participam do PvP.
         */
        if (history.killsAgainstInactivePlayers >= 10) {
            score += 25;
        }

        /**
         * Threshold inicial.
         *
         * Depois podemos substituir isso por
         * um algoritmo muito mais sofisticado.
         */
        return score >= 70;
    }
}