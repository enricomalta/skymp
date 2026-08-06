"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyService = void 0;
const EconomyRepository_1 = require("./EconomyRepository");
const InventoryService_1 = require("../inventory/InventoryService");
class EconomyService {
    repository = new EconomyRepository_1.EconomyRepository();
    inventoryService = new InventoryService_1.InventoryService();
    GOLD_ITEM_ID = "gold_coin";
    async createAccount(characterId) {
        const exists = await this.repository.findByCharacter(characterId);
        if (exists) {
            throw new Error("Este personagem já possui uma conta bancária.");
        }
        return this.repository.create(characterId);
    }
    async findByCharacter(characterId) {
        return this.repository.findByCharacter(characterId);
    }
    async deposit(dto) {
        const account = await this.repository.findByCharacter(dto.characterId);
        if (!account) {
            throw new Error("Conta bancária não encontrada.");
        }
        await this.inventoryService.removeItem({
            characterId: dto.characterId,
            itemId: this.GOLD_ITEM_ID,
            quantity: dto.amount
        });
        account.balance += dto.amount;
        return this.repository.update(account);
    }
    async withdraw(dto) {
        const account = await this.repository.findByCharacter(dto.characterId);
        if (!account) {
            throw new Error("Conta bancária não encontrada.");
        }
        if (account.balance < dto.amount) {
            throw new Error("Saldo insuficiente.");
        }
        account.balance -= dto.amount;
        await this.inventoryService.addItem({
            characterId: dto.characterId,
            itemId: this.GOLD_ITEM_ID,
            quantity: dto.amount
        });
        return this.repository.update(account);
    }
}
exports.EconomyService = EconomyService;
