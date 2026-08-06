"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterBootstrap = void 0;
const InventoryService_1 = require("../../inventory/InventoryService");
const EconomyService_1 = require("../../economy/EconomyService");
class CharacterBootstrap {
    inventoryService = new InventoryService_1.InventoryService();
    economyService = new EconomyService_1.EconomyService();
    async initialize(characterId) {
        await this.inventoryService.createInventory(characterId);
        await this.economyService.createAccount(characterId);
    }
}
exports.CharacterBootstrap = CharacterBootstrap;
