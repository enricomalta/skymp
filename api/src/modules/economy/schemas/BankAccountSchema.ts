import { Schema, model } from "mongoose";

const BankAccountSchema = new Schema({

    characterId: {

        type: Schema.Types.ObjectId,

        ref: "Character",

        required: true,

        unique: true

    },

    balance: {

        type: Number,

        default: 0,

        min: 0

    }

}, {

    timestamps: true

});

export const BankAccountModel = model(
    "BankAccount",
    BankAccountSchema
);