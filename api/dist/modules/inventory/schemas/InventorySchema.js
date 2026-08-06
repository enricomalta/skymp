"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    characterId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.InventoryModel = (0, mongoose_1.model)("Inventory", InventorySchema);
