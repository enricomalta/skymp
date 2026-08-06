"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
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
exports.ItemModel = (0, mongoose_1.model)("Item", ItemSchema);
