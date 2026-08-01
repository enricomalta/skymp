import { Schema, model } from "mongoose";

const QuestSchema = new Schema({

    identifier: {

        type: String,

        required: true,

        unique: true

    },

    name: {

        type: String,

        required: true

    },

    description: {

        type: String,

        required: true

    },

    npcIdentifier: {

        type: String,

        required: true

    },

    requiredProgress: {

        type: Number,

        required: true

    },

    rewardGold: {

        type: Number,

        required: true,

        default: 0

    },

    enabled: {

        type: Boolean,

        default: true

    }

}, {

    timestamps: true

});

export const QuestModel = model(
    "Quest",
    QuestSchema
);