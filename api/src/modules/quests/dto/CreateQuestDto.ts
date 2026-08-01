export interface CreateQuestDto {

    identifier: string;

    name: string;

    description: string;

    npcIdentifier: string;

    requiredProgress: number;

    rewardGold: number;

}