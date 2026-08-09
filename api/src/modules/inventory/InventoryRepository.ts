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

        return this.toModel(
            document
        );

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

        return this.toModel(
            document
        );

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

                returnDocument: "after"

            }

        );

        if (!updated) {

            throw new Error("Inventário não encontrado.");

        }

        return this.toModel(
            document
        );

    }

    private toModel(
        document: any
    ): Inventory {

        return {

            id:
                document._id.toString(),

            characterId:
                document.characterId,

            items:
                document.items.map(
                    (item: any) => ({

                        itemId:
                            item.itemId,

                        quantity:
                            item.quantity

                    })
                ),

            createdAt:
                document.createdAt

        };

    }

}
