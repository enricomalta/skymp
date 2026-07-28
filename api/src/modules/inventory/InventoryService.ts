import { InventoryRepository } from "./InventoryRepository";

import { Inventory } from "./models/Inventory";

import { AddItemDto } from "./dto/AddItemDto";
import { RemoveItemDto } from "./dto/RemoveItemDto";

export class InventoryService {

    private readonly repository = new InventoryRepository();

    public async createInventory(
        characterId: string
    ): Promise<Inventory> {

        const exists = await this.repository.findByCharacter(
            characterId
        );

        if (exists) {

            throw new Error(
                "Este personagem já possui um inventário."
            );

        }

        return this.repository.create(characterId);

    }

    public async findByCharacter(
        characterId: string
    ): Promise<Inventory | null> {

        return this.repository.findByCharacter(characterId);

    }

    public async addItem(
        dto: AddItemDto
    ): Promise<Inventory> {

        const inventory = await this.repository.findByCharacter(
            dto.characterId
        );

        if (!inventory) {

            throw new Error("Inventário não encontrado.");

        }

        const item = inventory.items.find(
            item => item.itemId === dto.itemId
        );

        if (item) {

            item.quantity += dto.quantity;

        } else {

            inventory.items.push({

                itemId: dto.itemId,

                quantity: dto.quantity

            });

        }

        return this.repository.update(inventory);

    }

    public async removeItem(
        dto: RemoveItemDto
    ): Promise<Inventory> {

        const inventory = await this.repository.findByCharacter(
            dto.characterId
        );

        if (!inventory) {

            throw new Error("Inventário não encontrado.");

        }

        const item = inventory.items.find(
            item => item.itemId === dto.itemId
        );

        if (!item) {

            throw new Error("Item não encontrado.");

        }

        if (item.quantity < dto.quantity) {

            throw new Error("Quantidade insuficiente.");

        }

        item.quantity -= dto.quantity;

        if (item.quantity === 0) {

            inventory.items = inventory.items.filter(
                current => current.itemId !== dto.itemId
            );

        }

        return this.repository.update(inventory);

    }

}