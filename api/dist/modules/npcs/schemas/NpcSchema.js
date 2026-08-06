"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcModel = void 0;
const mongoose_1 = require("mongoose");
const NpcSchema = new mongoose_1.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
exports.NpcModel = (0, mongoose_1.model)("Npc", NpcSchema);
