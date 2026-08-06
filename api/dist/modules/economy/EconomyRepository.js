"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyRepository = void 0;
const BankAccountSchema_1 = require("./schemas/BankAccountSchema");
class EconomyRepository {
    async create(characterId) {
        const created = await BankAccountSchema_1.BankAccountModel.create({
            characterId,
            balance: 0
        });
        return {
            id: created.id,
            characterId: created.characterId.toString(),
            balance: created.balance,
            createdAt: created.createdAt
        };
    }
    async findByCharacter(characterId) {
        const account = await BankAccountSchema_1.BankAccountModel.findOne({
            characterId
        });
        if (!account) {
            return null;
        }
        return {
            id: account.id,
            characterId: account.characterId.toString(),
            balance: account.balance,
            createdAt: account.createdAt
        };
    }
    async update(account) {
        const updated = await BankAccountSchema_1.BankAccountModel.findByIdAndUpdate(account.id, {
            balance: account.balance
        }, {
            returnDocument: "after"
        });
        if (!updated) {
            throw new Error("Conta bancária não encontrada.");
        }
        return {
            id: updated.id,
            characterId: updated.characterId.toString(),
            balance: updated.balance,
            createdAt: updated.createdAt
        };
    }
}
exports.EconomyRepository = EconomyRepository;
