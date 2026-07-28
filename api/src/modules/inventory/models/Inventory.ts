import { InventoryItem } from "./InventoryItem";

export interface Inventory {

    id: string;

    characterId: string;

    items: InventoryItem[];

    createdAt: Date;

}