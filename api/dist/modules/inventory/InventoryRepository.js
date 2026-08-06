"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const InventorySchema_1 = require("./schemas/InventorySchema");
class InventoryRepository {
    async create(characterId) {
        const created = await InventorySchema_1.InventoryModel.create({
            characterId,
            items: []
        });
        return {
            id: created.id,
            characterId: created.characterId.toString(),
            items: created.items,
            createdAt: created.createdAt
        };
    }
    async findByCharacter(characterId) {
        const inventory = await InventorySchema_1.InventoryModel.findOne({
            characterId
        });
        if (!inventory) {
            return null;
        }
        return {
            id: inventory.id,
            characterId: inventory.characterId.toString(),
            items: inventory.items,
            createdAt: inventory.createdAt
        };
    }
    async update(inventory) {
        const updated = await InventorySchema_1.InventoryModel.findByIdAndUpdate(inventory.id, {
            items: inventory.items
        }, {
            returnDocument: "after"
        });
        if (!updated) {
            throw new Error("Inventário não encontrado.");
        }
        return {
            id: updated.id,
            characterId: updated.characterId.toString(),
            items: updated.items,
            createdAt: updated.createdAt
        };
    }
}
exports.InventoryRepository = InventoryRepository;
