import { Schema, model } from "mongoose";

const CharacterSchema = new Schema({

    accountId: {

        type: Schema.Types.ObjectId,

        ref: "Account",

        required: true

    },

    name: {

        type: String,

        required: true,

        unique: true

    },

    race: {

        type: String,

        required: true

    },

    sex: {

        type: String,

        enum: ["male", "female"],

        required: true

    },

    level: {

        type: Number,

        default: 1

    }

}, {

    timestamps: true

});

export const CharacterModel = model(
    "Character",
    CharacterSchema
);