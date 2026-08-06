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

    },

    // Numeric identity used by SkyMP. It is deliberately separate from the
    // Mongo ObjectId used by the launcher/API.
    profileId: {

        type: Number,

        unique: true,

        sparse: true

    }

}, {

    timestamps: true

});

export const AccountModel = model(
    "Account",
    AccountSchema
);
