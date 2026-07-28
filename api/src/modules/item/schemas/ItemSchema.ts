import { Schema, model } from "mongoose";

const ItemSchema = new Schema({

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

        default: ""

    },

    type: {

        type: String,

        required: true

    },

    weight: {

        type: Number,

        default: 0

    },

    value: {

        type: Number,

        default: 0

    },

    stackable: {

        type: Boolean,

        default: true

    }

}, {

    timestamps: true

});

export const ItemModel = model(
    "Item",
    ItemSchema
);