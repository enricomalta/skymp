"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const ItemSchema_1 = require("./schemas/ItemSchema");
class ItemRepository {
    async create(item) {
        const created = await ItemSchema_1.ItemModel.create(item);
        return {
            id: created.id,
            identifier: created.identifier,
            name: created.name,
            description: created.description,
            type: created.type,
            weight: created.weight,
            value: created.value,
            stackable: created.stackable,
            createdAt: created.createdAt
        };
    }
    async findById(id) {
        const item = await ItemSchema_1.ItemModel.findById(id);
        if (!item) {
            return null;
        }
        return {
            id: item.id,
            identifier: item.identifier,
            name: item.name,
            description: item.description,
            type: item.type,
            weight: item.weight,
            value: item.value,
            stackable: item.stackable,
            createdAt: item.createdAt
        };
    }
    async findByIdentifier(identifier) {
        const item = await ItemSchema_1.ItemModel.findOne({
            identifier
        });
        if (!item) {
            return null;
        }
        return {
            id: item.id,
            identifier: item.identifier,
            name: item.name,
            description: item.description,
            type: item.type,
            weight: item.weight,
            value: item.value,
            stackable: item.stackable,
            createdAt: item.createdAt
        };
    }
    async findAll() {
        const items = await ItemSchema_1.ItemModel.find();
        return items.map(item => ({
            id: item.id,
            identifier: item.identifier,
            name: item.name,
            description: item.description,
            type: item.type,
            weight: item.weight,
            value: item.value,
            stackable: item.stackable,
            createdAt: item.createdAt
        }));
    }
}
exports.ItemRepository = ItemRepository;
