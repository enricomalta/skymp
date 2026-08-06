"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const express_1 = require("express");
const InventoryService_1 = require("./InventoryService");
class InventoryController {
    router = (0, express_1.Router)();
    service = new InventoryService_1.InventoryService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.create.bind(this));
        this.router.get("/:characterId", this.findByCharacter.bind(this));
        this.router.post("/add-item", this.addItem.bind(this));
        this.router.post("/remove-item", this.removeItem.bind(this));
    }
    async create(req, res) {
        try {
            const inventory = await this.service.createInventory(req.body.characterId);
            res.status(201).json({
                success: true,
                data: inventory
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });
        }
    }
    async findByCharacter(req, res) {
        try {
            const inventory = await this.service.findByCharacter(req.params.characterId);
            if (!inventory) {
                res.status(404).json({
                    success: false,
                    message: "Inventário não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: inventory
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });
        }
    }
    async addItem(req, res) {
        try {
            const inventory = await this.service.addItem(req.body);
            res.status(200).json({
                success: true,
                data: inventory
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });
        }
    }
    async removeItem(req, res) {
        try {
            const inventory = await this.service.removeItem(req.body);
            res.status(200).json({
                success: true,
                data: inventory
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });
        }
    }
}
exports.InventoryController = InventoryController;
