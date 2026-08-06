"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountModel = void 0;
const mongoose_1 = require("mongoose");
const BankAccountSchema = new mongoose_1.Schema({
    characterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Character",
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});
exports.BankAccountModel = (0, mongoose_1.model)("BankAccount", BankAccountSchema);
