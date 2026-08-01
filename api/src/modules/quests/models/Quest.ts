export interface Quest {

    id: string;

    identifier: string;

    name: string;

    description: string;

    npcIdentifier: string;

    requiredProgress: number;

    rewardGold: number;

    enabled: boolean;

    createdAt: Date;

}