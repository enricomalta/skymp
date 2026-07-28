import { Schema, model } from "mongoose";

const NpcSchema = new Schema({

    identifier: {

        type: String,

        required: true,

        unique: true

    },

    name: {

        type: String,

        required: true

    },

    race: {

        type: String,

        required: true

    },

    location: {

        type: String,

        required: true

    },

    enabled: {

        type: Boolean,

        default: true

    }

}, {

    timestamps: true

});

export const NpcModel = model(
    "Npc",
    NpcSchema
);