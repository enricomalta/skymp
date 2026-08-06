"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AntiCheatEventSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: Number,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
});
exports.default = mongoose_1.default.model("AntiCheatEvent", AntiCheatEventSchema);
