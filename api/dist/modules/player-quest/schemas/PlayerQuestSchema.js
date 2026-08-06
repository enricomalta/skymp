"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQuestModel = void 0;
const mongoose_1 = require("mongoose");
const QuestStatus_1 = require("../models/QuestStatus");
const PlayerQuestSchema = new mongoose_1.Schema({
    characterId: {
        type: String,
        required: true
    },
    questId: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    requiredProgress: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(QuestStatus_1.QuestStatus),
        default: QuestStatus_1.QuestStatus.IN_PROGRESS
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});
exports.PlayerQuestModel = (0, mongoose_1.model)("PlayerQuest", PlayerQuestSchema);
