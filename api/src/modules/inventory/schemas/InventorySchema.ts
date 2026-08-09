import mongoose, {
    Document,
    Schema
} from "mongoose";

export interface InventoryDocument
    extends Document {

    characterId: string;

    items: {

        itemId: string;

        quantity: number;

    }[];

    createdAt: Date;

}

const InventoryItemSchema =
    new Schema(
        {

            itemId: {

                type: String,

                required: true

            },

            quantity: {

                type: Number,

                required: true,

                min: 0

            }

        },

        {
            _id: false
        }
    );

const InventorySchema =
    new Schema<InventoryDocument>(
        {

            characterId: {

                type: String,

                required: true,

                unique: true,

                index: true

            },

            items: {

                type: [
                    InventoryItemSchema
                ],

                default: []

            },

            createdAt: {

                type: Date,

                default: Date.now

            }

        }
    );

export const InventoryModel =
    mongoose.model<InventoryDocument>(
        "Inventory",
        InventorySchema
    );