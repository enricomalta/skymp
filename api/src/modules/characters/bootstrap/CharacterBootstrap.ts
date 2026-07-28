import { InventoryService } from "../../inventory/InventoryService";
import { EconomyService } from "../../economy/EconomyService";

export class CharacterBootstrap {

    private readonly inventoryService = new InventoryService();

    private readonly economyService = new EconomyService();

    public async initialize(
        characterId: string
    ): Promise<void> {

        await this.inventoryService.createInventory(
            characterId
        );

        await this.economyService.createAccount(
            characterId
        );

    }

}