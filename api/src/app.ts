import express from "express";
import { SystemController } from "./modules/system/SystemController";
import { AuthController } from "./modules/auth/AuthController";
import { CharacterController } from "./modules/characters/CharacterController";
import { InventoryController } from "./modules/inventory/InventoryController";
import { ItemController } from "./modules/item/ItemController";
import { EconomyController } from "./modules/economy/EconomyController";
import { NpcController } from "./modules/npcs/NpcController";
import { QuestController } from "./modules/quests/QuestController";
import { PlayerQuestController } from "./modules/player-quest/PlayerQuestController";


const app = express();

app.use(express.json());

const systemController = new SystemController();
const authController = new AuthController();
const characterController = new CharacterController();
const inventoryController = new InventoryController();
const itemController = new ItemController();
const economyController = new EconomyController();
const npcController = new NpcController();
const questController = new QuestController();
const playerQuestController = new PlayerQuestController();


app.use("/system", systemController.router);

app.use("/auth", authController.router);

app.use("/characters", characterController.router);

app.use("/inventories", inventoryController.router);

app.use("/items", itemController.router);

app.use("/economy", economyController.router);

app.use("/npcs", npcController.router);

app.use("/quests", questController.router);

app.use("/player-quests", playerQuestController.router);


export default app;