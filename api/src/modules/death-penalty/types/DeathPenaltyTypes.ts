export enum DeathCause {

    PVP = "pvp",

    PK = "pk",

    WAR = "war",

    RED_SKULL = "red_skull"

}

export interface DeathPenaltyPolicy {

    experienceLossPercent: number;

    itemDropEnabled: boolean;

    itemDropCount: number;

    protectsAmuletOfLoss: boolean;

}

export interface DeathItemDrop {

    itemId: string;

    quantity: number;

}

export interface DeathPenaltyResult {

    characterId: string;

    cause: DeathCause;

    experienceLossPercent: number;

    experienceLost: number;

    levelDowns: number;

    itemsDropped: DeathItemDrop[];

    amuletOfLossProtected: boolean;

}