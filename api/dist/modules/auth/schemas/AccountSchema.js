"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Numeric identity used by SkyMP. It is deliberately separate from the
    // Mongo ObjectId used by the launcher/API.
    profileId: {
        type: Number,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});
exports.AccountModel = (0, mongoose_1.model)("Account", AccountSchema);
