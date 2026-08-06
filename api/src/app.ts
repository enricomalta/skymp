import express from "express";
import { SystemController } from "./modules/system/SystemController";
import { AuthController } from "./modules/auth/AuthController";
import { SkyMpSessionController } from "./modules/auth/SkyMpSessionController";
import { CharacterController } from "./modules/characters/CharacterController";
import { InventoryController } from "./modules/inventory/InventoryController";
import { ItemController } from "./modules/item/ItemController";
import { EconomyController } from "./modules/economy/EconomyController";
import { NpcController } from "./modules/npcs/NpcController";
import { QuestController } from "./modules/quests/QuestController";
import { PlayerQuestController } from "./modules/player-quest/PlayerQuestController";
import antiCheatRoutes from "./modules/anticheat/AntiCheatRoutes";

const app = express();

app.use(express.json());

const systemController = new SystemController();
const authController = new AuthController();
const skyMpSessionController = new SkyMpSessionController();
const characterController = new CharacterController();
const inventoryController = new InventoryController();
const itemController = new ItemController();
const economyController = new EconomyController();
const npcController = new NpcController();
const questController = new QuestController();
const playerQuestController = new PlayerQuestController();


app.use("/system", systemController.router);

app.use("/anticheat",antiCheatRoutes);

app.use("/auth", authController.router);

// Compatibility surface consumed by the SkyMP server while authenticating a
// launcher-issued JWT. Do not expose a local profileId to the game client.
app.use("/api", skyMpSessionController.router);

app.use("/characters", characterController.router);

app.use("/inventories", inventoryController.router);

app.use("/items", itemController.router);

app.use("/economy", economyController.router);

app.use("/npcs", npcController.router);

app.use("/quests", questController.router);

app.use("/player-quests", playerQuestController.router);


export default app;
