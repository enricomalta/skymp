import { CreateItemDto } from "./dto/CreateItemDto";
import { Item } from "./models/Item";
import { ItemModel } from "./schemas/ItemSchema";

export class ItemRepository {

    public async create(
        item: CreateItemDto
    ): Promise<Item> {

        const created = await ItemModel.create(item);

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

    public async findById(
        id: string
    ): Promise<Item | null> {

        const item = await ItemModel.findById(id);

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

    public async findByIdentifier(
        identifier: string
    ): Promise<Item | null> {

        const item = await ItemModel.findOne({
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

    public async findAll(): Promise<Item[]> {

        const items = await ItemModel.find();

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