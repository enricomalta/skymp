import { Schema, model } from "mongoose";

const AccountSchema = new Schema({

    email: {

        type: String,

        required: true,

        unique: true

    },

    password: {

        type: String,

        required: true

    }

}, {

    timestamps: true

});

export const AccountModel = model(
    "Account",
    AccountSchema
);