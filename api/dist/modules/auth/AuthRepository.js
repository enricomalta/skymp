"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const AccountSchema_1 = require("./schemas/AccountSchema");
class AuthRepository {
    async create(account) {
        const created = await AccountSchema_1.AccountModel.create(account);
        return {
            id: created.id,
            email: created.email,
            password: created.password,
            createdAt: created.createdAt
        };
    }
    async findByEmail(email) {
        const account = await AccountSchema_1.AccountModel.findOne({
            email
        });
        if (!account) {
            return null;
        }
        return {
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt
        };
    }
    async findById(id) {
        return AccountSchema_1.AccountModel.findById(id);
    }
    async getOrAssignProfileId(accountId) {
        const account = await AccountSchema_1.AccountModel.findById(accountId);
        if (!account) {
            throw new Error("Conta n\u00e3o encontrada.");
        }
        if (typeof account.profileId === "number") {
            return account.profileId;
        }
        // The existing installation only has the administrator account. Giving
        // the first unmapped account profile 1 preserves its current character.
        const latest = await AccountSchema_1.AccountModel
            .findOne({ profileId: { $type: "number" } })
            .sort({ profileId: -1 })
            .select({ profileId: 1 });
        account.profileId = (latest?.profileId ?? 0) + 1;
        try {
            await account.save();
        }
        catch (error) {
            // A concurrent first login may allocate the same value. Fetch the
            // document again before surfacing an actual persistence error.
            const refreshed = await AccountSchema_1.AccountModel.findById(accountId);
            if (typeof refreshed?.profileId === "number") {
                return refreshed.profileId;
            }
            throw error;
        }
        return account.profileId;
    }
}
exports.AuthRepository = AuthRepository;
