import { Inventory } from "./models/Inventory";
import { InventoryModel } from "./schemas/InventorySchema";

export class InventoryRepository {

    public async create(
        characterId: string
    ): Promise<Inventory> {

        const created = await InventoryModel.create({

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

    public async findByCharacter(
        characterId: string
    ): Promise<Inventory | null> {

        const inventory = await InventoryModel.findOne({

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

    public async update(
        inventory: Inventory
    ): Promise<Inventory> {

        const updated = await InventoryModel.findByIdAndUpdate(

            inventory.id,

            {

                items: inventory.items

            },

            {

                new: true

            }

        );

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