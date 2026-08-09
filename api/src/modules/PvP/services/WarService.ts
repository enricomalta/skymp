import {
    WarRelation
} from "../types/PvPTypes";

export class WarService {

    private readonly wars =
        new Map<string, WarRelation>();

    public startWar(
        clanAId: string,
        clanBId: string
    ): WarRelation {

        if (
            clanAId === clanBId
        ) {

            throw new Error(
                "Um cla nao pode declarar guerra contra si mesmo."
            );

        }

        const key =
            this.createWarKey(
                clanAId,
                clanBId
            );

        const existing =
            this.wars.get(
                key
            );

        if (existing?.active) {

            return existing;

        }

        const war: WarRelation = {

            clanAId,

            clanBId,

            startedAt:
                new Date(),

            active: true

        };

        this.wars.set(
            key,
            war
        );

        return war;

    }

    public endWar(
        clanAId: string,
        clanBId: string
    ): void {

        const key =
            this.createWarKey(
                clanAId,
                clanBId
            );

        const war =
            this.wars.get(
                key
            );

        if (!war) {
            return;
        }

        war.active = false;

    }

    public isAtWar(
        clanAId: string,
        clanBId: string
    ): boolean {

        const key =
            this.createWarKey(
                clanAId,
                clanBId
            );

        return (
            this.wars.get(key)
                ?.active === true
        );

    }

    public isWarEnemyVisible(
        viewerClanId: string,
        targetClanId: string
    ): boolean {

        return this.isAtWar(
            viewerClanId,
            targetClanId
        );

    }

    private createWarKey(
        clanAId: string,
        clanBId: string
    ): string {

        return [
            clanAId,
            clanBId
        ]
            .sort()
            .join(":");

    }

}