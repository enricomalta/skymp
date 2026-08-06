"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const InventoryRepository_1 = require("./InventoryRepository");
class InventoryService {
    repository = new InventoryRepository_1.InventoryRepository();
    async createInventory(characterId) {
        const exists = await this.repository.findByCharacter(characterId);
        if (exists) {
            throw new Error("Este personagem já possui um inventário.");
        }
        return this.repository.create(characterId);
    }
    async findByCharacter(characterId) {
        return this.repository.findByCharacter(characterId);
    }
    async addItem(dto) {
        const inventory = await this.repository.findByCharacter(dto.characterId);
        if (!inventory) {
            throw new Error("Inventário não encontrado.");
        }
        const item = inventory.items.find(item => item.itemId === dto.itemId);
        if (item) {
            item.quantity += dto.quantity;
        }
        else {
            inventory.items.push({
                itemId: dto.itemId,
                quantity: dto.quantity
            });
        }
        return this.repository.update(inventory);
    }
    async removeItem(dto) {
        const inventory = await this.repository.findByCharacter(dto.characterId);
        if (!inventory) {
            throw new Error("Inventário não encontrado.");
        }
        const item = inventory.items.find(item => item.itemId === dto.itemId);
        if (!item) {
            throw new Error("Item não encontrado.");
        }
        if (item.quantity < dto.quantity) {
            throw new Error("Quantidade insuficiente.");
        }
        item.quantity -= dto.quantity;
        if (item.quantity === 0) {
            inventory.items = inventory.items.filter(current => current.itemId !== dto.itemId);
        }
        return this.repository.update(inventory);
    }
}
exports.InventoryService = InventoryService;
