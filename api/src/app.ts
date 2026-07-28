import express from "express";
import { AuthController } from "./modules/auth/AuthController";
import { CharacterController } from "./modules/characters/CharacterController";
import { InventoryController } from "./modules/inventory/InventoryController";
import { ItemController } from "./modules/item/ItemController";

const app = express();

app.use(express.json());

const authController = new AuthController();
const characterController = new CharacterController();
const inventoryController = new InventoryController();
const itemController = new ItemController();


app.use("/auth", authController.router);

app.use("/characters", characterController.router);

app.use("/inventories", inventoryController.router);

app.use("/items", itemController.router);

export default app;