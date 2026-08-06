"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerManager = void 0;
const Logger_1 = require("./Logger");
const LoggerContext_1 = require("./types/LoggerContext");
class PlayerManager {
    players = new Map();
    add(player) {
        if (this.players.has(player.id)) {
            throw new Error(`O jogador ${player.id} já está conectado.`);
        }
        this.players.set(player.id, player);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.PLAYER, `Jogador "${player.name}" conectado.`);
    }
    remove(id) {
        const player = this.players.get(id);
        if (!player) {
            return false;
        }
        this.players.delete(id);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.PLAYER, `Jogador "${player.name}" desconectado.`);
        return true;
    }
    get(id) {
        return this.players.get(id);
    }
    getAll() {
        return [...this.players.values()];
    }
    has(id) {
        return this.players.has(id);
    }
    count() {
        return this.players.size;
    }
    clear() {
        this.players.clear();
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.PLAYER, "Todos os jogadores foram removidos da memória.");
    }
}
exports.PlayerManager = PlayerManager;
