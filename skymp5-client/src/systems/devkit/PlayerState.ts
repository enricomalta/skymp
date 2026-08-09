import { printConsole } from "skyrimPlatform";

declare const mp: any;

export interface PlayerPosition {
    x: number;
    y: number;
    z: number;
}

export interface PlayerAngle {
    x: number;
    y: number;
    z: number;
}

export interface PlayerStateData {
    userId: number;
    position: PlayerPosition;
    angle: PlayerAngle;
    worldOrCellDesc: string;
}

export class PlayerState {
    private players = new Map<number, PlayerStateData>();

    connect(userId: number) {
        this.update(userId);
    }

    disconnect(userId: number) {
        this.players.delete(userId);
    }

    update(userId: number) {
        try {
            const type = mp.get(userId, "type");

            if (type !== "MpActor") {
                return;
            }

            const position = mp.get(userId, "pos");
            const angle = mp.get(userId, "angle");
            const worldOrCellDesc = mp.get(
                userId,
                "worldOrCellDesc"
            );

            if (
                !Array.isArray(position) ||
                position.length < 3
            ) {
                return;
            }

            if (
                !Array.isArray(angle) ||
                angle.length < 3
            ) {
                return;
            }

            this.players.set(userId, {
                userId,

                position: {
                    x: Number(position[0]),
                    y: Number(position[1]),
                    z: Number(position[2]),
                },

                angle: {
                    x: Number(angle[0]),
                    y: Number(angle[1]),
                    z: Number(angle[2]),
                },

                worldOrCellDesc: String(
                    worldOrCellDesc ?? ""
                ),
            });
        } catch (error) {
            printConsole(
                `[DevKit] Failed to update player ${userId}:`,
                error
            );
        }
    }

    get(
        userId: number
    ): PlayerStateData | undefined {
        return this.players.get(userId);
    }

    getAll(): PlayerStateData[] {
        return Array.from(
            this.players.values()
        );
    }

    clear() {
        this.players.clear();
    }
}