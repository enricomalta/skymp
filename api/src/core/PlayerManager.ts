import { Player } from "../models/Player";
import { Logger } from "./Logger";
import { LoggerContext } from "./types/LoggerContext";

export class PlayerManager {

    private readonly players = new Map<number, Player>();

    public add(player: Player): void {

        if (this.players.has(player.id)) {

            throw new Error(
                `O jogador ${player.id} já está conectado.`
            );

        }

        this.players.set(player.id, player);

        Logger.info(
            LoggerContext.PLAYER,
            `Jogador "${player.name}" conectado.`
        );

    }

    public remove(id: number): boolean {

        const player = this.players.get(id);

        if (!player) {

            return false;

        }

        this.players.delete(id);

        Logger.info(
            LoggerContext.PLAYER,
            `Jogador "${player.name}" desconectado.`
        );

        return true;

    }

    public get(id: number): Player | undefined {

        return this.players.get(id);

    }

    public getAll(): readonly Player[] {

        return [...this.players.values()];

    }

    public has(id: number): boolean {

        return this.players.has(id);

    }

    public count(): number {

        return this.players.size;

    }

    public clear(): void {

        this.players.clear();

        Logger.info(
            LoggerContext.PLAYER,
            "Todos os jogadores foram removidos da memória."
        );

    }

}