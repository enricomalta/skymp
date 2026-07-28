import { Schema, model } from "mongoose";

const InventorySchema = new Schema({

    characterId: {

        type: Schema.Types.ObjectId,

        ref: "Character",

        required: true,

        unique: true

    },

    items: [

        {

            itemId: {

                type: String,

                required: true

            },

            quantity: {

                type: Number,

                required: true,

                default: 1

            }

        }

    ]

}, {

    timestamps: true

});

export const InventoryModel = model(
    "Inventory",
    InventorySchema
);