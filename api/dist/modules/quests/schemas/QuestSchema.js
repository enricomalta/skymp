"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestModel = void 0;
const mongoose_1 = require("mongoose");
const QuestSchema = new mongoose_1.Schema({
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
        required: true
    },
    npcIdentifier: {
        type: String,
        required: true
    },
    requiredProgress: {
        type: Number,
        required: true
    },
    rewardGold: {
        type: Number,
        required: true,
        default: 0
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
exports.QuestModel = (0, mongoose_1.model)("Quest", QuestSchema);
