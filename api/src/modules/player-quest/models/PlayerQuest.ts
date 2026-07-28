import { QuestStatus } from "./QuestStatus";

export interface PlayerQuest {

    id: string;

    characterId: string;

    questId: string;

    progress: number;

    requiredProgress: number;

    status: QuestStatus;

    startedAt: Date;

    completedAt?: Date;

}