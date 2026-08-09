"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PvPService = void 0;
const PvPTypes_1 = require("../types/PvPTypes");
class PvPService {
    PVP_FLAG_DURATION = 60_000;
    players = new Map();
    registerPlayer(player) {
        this.players.set(player.id, player);
    }
    getPlayer(playerId) {
        return this.players.get(playerId);
    }
    /**
     * Jogador inicia ataque contra outro jogador.
     */
    attack(attackerId, targetId) {
        const attacker = this.getRequiredPlayer(attackerId);
        const target = this.getRequiredPlayer(targetId);
        /**
         * Atacar PK não cria PvP flag.
         */
        if (target.criminalState?.pkCount && target.criminalState.pkCount > 0) {
            return;
        }
        /**
         * Guerra não utiliza a flag roxa.
         * A guerra será tratada pelo WarService.
         */
        this.activatePvPFlag(attacker);
        this.activatePvPFlag(target);
    }
    /**
     * Registra uma morte entre dois jogadores.
     */
    handleKill(killerId, victimId) {
        const killer = this.getRequiredPlayer(killerId);
        const victim = this.getRequiredPlayer(victimId);
        /**
         * Se estão em guerra, a morte é WAR.
         */
        if (this.areEnemiesInWar(killer, victim)) {
            return PvPTypes_1.KillType.WAR;
        }
        /**
         * Matar PK não é PK.
         */
        if (this.isCriminal(victim)) {
            return PvPTypes_1.KillType.PVP;
        }
        /**
         * Ambos estão participando de PvP.
         */
        if (this.hasActivePvPFlag(killer) &&
            this.hasActivePvPFlag(victim)) {
            return PvPTypes_1.KillType.PVP;
        }
        /**
         * Jogador matou alguém que não estava
         * participando do PvP.
         *
         * Isso é PK.
         */
        return PvPTypes_1.KillType.PK;
    }
    /**
     * Retorna a relação entre dois jogadores.
     *
     * IMPORTANTE:
     * a relação é contextual.
     */
    getRelation(viewerId, targetId) {
        const viewer = this.getRequiredPlayer(viewerId);
        const target = this.getRequiredPlayer(targetId);
        /**
         * Guerra tem prioridade.
         */
        if (this.areEnemiesInWar(viewer, target)) {
            return PvPTypes_1.PlayerRelation.WAR_ENEMY;
        }
        /**
         * PK.
         */
        if (this.isCriminal(target)) {
            return PvPTypes_1.PlayerRelation.CRIMINAL;
        }
        /**
         * PvP.
         */
        if (this.hasActivePvPFlag(target)) {
            return PvPTypes_1.PlayerRelation.PVP;
        }
        return PvPTypes_1.PlayerRelation.NEUTRAL;
    }
    /**
     * Decide a cor do nome baseada
     * no ponto de vista de quem está olhando.
     */
    getNameColor(viewerId, targetId) {
        const relation = this.getRelation(viewerId, targetId);
        switch (relation) {
            case PvPTypes_1.PlayerRelation.PVP:
                return PvPTypes_1.PlayerNameColor.PURPLE;
            case PvPTypes_1.PlayerRelation.CRIMINAL:
            case PvPTypes_1.PlayerRelation.WAR_ENEMY:
                return PvPTypes_1.PlayerNameColor.RED;
            default:
                return PvPTypes_1.PlayerNameColor.WHITE;
        }
    }
    activatePvPFlag(player) {
        if (!player.pvpFlag) {
            player.pvpFlag = {
                playerId: player.id,
                active: true,
                expiresAt: Date.now() + this.PVP_FLAG_DURATION
            };
            return;
        }
        player.pvpFlag.active = true;
        player.pvpFlag.expiresAt =
            Date.now() + this.PVP_FLAG_DURATION;
    }
    hasActivePvPFlag(player) {
        if (!player.pvpFlag) {
            return false;
        }
        if (!player.pvpFlag.active) {
            return false;
        }
        if (player.pvpFlag.expiresAt !== null &&
            Date.now() >= player.pvpFlag.expiresAt) {
            player.pvpFlag.active = false;
            return false;
        }
        return true;
    }
    isCriminal(player) {
        return (player.criminalState?.pkCount ?? 0) > 0;
    }
    areEnemiesInWar(_a, _b) {
        /**
         * Será conectado ao WarService.
         */
        return false;
    }
    getRequiredPlayer(id) {
        const player = this.players.get(id);
        if (!player) {
            throw new Error(`Player ${id} não está registrado no PvPService.`);
        }
        return player;
    }
}
exports.PvPService = PvPService;
