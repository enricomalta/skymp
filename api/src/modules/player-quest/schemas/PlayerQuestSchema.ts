import { Schema, model } from "mongoose";

import { QuestStatus } from "../models/QuestStatus";

const PlayerQuestSchema = new Schema({

    characterId: {

        type: String,

        required: true

    },

    questId: {

        type: String,

        required: true

    },

    progress: {

        type: Number,

        default: 0

    },

    requiredProgress: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        enum: Object.values(QuestStatus),

        default: QuestStatus.IN_PROGRESS

    },

    startedAt: {

        type: Date,

        default: Date.now

    },

    completedAt: {

        type: Date

    }

});

export const PlayerQuestModel = model(
    "PlayerQuest",
    PlayerQuestSchema
);