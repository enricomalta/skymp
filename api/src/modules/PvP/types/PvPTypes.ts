// Cores do Status do PvP
export enum PvPStatus {

    WHITE = "white",

    PURPLE = "purple",

    RED = "red"

}

// Estado do PvP (FLAG ROXO)
export interface PvPState {
    characterId: string;
    status: PvPStatus;
    purpleUntil: Date | null;
    pvpPoints: number;
    pkPoints: number;
}

// Relação do jogador com target(idPlayer)
export enum PlayerRelation {

    NEUTRAL = "neutral",

    PVP = "pvp",

    WAR_ENEMY = "war_enemy",

    CRIMINAL = "criminal"

}

// Tipos de combate
export enum CombatType {

    NONE = "none",

    PVP = "pvp",

    PK = "pk",

    WAR = "war"

}

// Estado contador do flag
export interface PvPFlag {

    playerId: string;

    /**
     * Jogador está atualmente envolvido
     * em PvP comum.
     */
    active: boolean;

    /**
     * Momento em que a flag expira.
     */
    expiresAt: number | null;

}

// Estado do Karma/PK/RedSkull
export interface PlayerCriminalState {

    playerId: string;

    /**
     * Quantidade de PKs cometidos.
     */
    pkCount: number;

    /**
     * Pontuação criminal acumulada.
     */
    karma: number;

    /**
     * Se atingiu o estado Red Skull.
     */
    redSkull: boolean;

}

// Contador de Honra
export interface PlayerHonor {

    playerId: string;

    /**
     * Honra adquirida através de PvP legítimo,
     * guerras e caça a criminosos.
     */
    points: number;

}

// Estado de guerras de clan
export interface ClanWar {

    id: string;

    clanAId: string;

    clanBId: string;

    startedAt: Date;

    active: boolean;

}

// Data
export interface PlayerData {

    id: string;

    name: string;

    clanId?: string;

    pvpFlag?: PvPFlag;

    criminalState?: PlayerCriminalState;

    honor?: PlayerHonor;

}

/**
 * Resultado de uma tentativa de ataque.
 */
export interface AttackResult {

    attackerId: string;

    targetId: string;

    combatType: CombatType;

    attackerStatus: PvPStatus;

    targetStatus: PvPStatus;

    attackerCanAttack: boolean;

    attackerBecomesPurple: boolean;

}

/**
 * Resultado da resolução de uma morte.
 */
export interface KillResult {

    killerId: string;

    victimId: string;

    combatType: CombatType;

    killerStatus: PvPStatus;

    pvpPointsGained: number;

    becamePK: boolean;

}

/**
 * Estado de combate utilizado internamente
 * pelo PvP System.
 */
export interface CombatState {

    attackerId: string;

    targetId: string;

    combatType: CombatType;

    startedAt: number;

    active: boolean;

}