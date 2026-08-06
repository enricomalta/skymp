"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const express_1 = require("express");
const ItemService_1 = require("./ItemService");
class ItemController {
    router = (0, express_1.Router)();
    service = new ItemService_1.ItemService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.create.bind(this));
        this.router.get("/", this.findAll.bind(this));
        this.router.get("/identifier/:identifier", this.findByIdentifier.bind(this));
        this.router.get("/:id", this.findById.bind(this));
    }
    async create(req, res) {
        try {
            const item = await this.service.createItem(req.body);
            res.status(201).json({
                success: true,
                data: item
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
    async findAll(req, res) {
        try {
            const items = await this.service.findAll();
            res.status(200).json({
                success: true,
                data: items
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
    async findById(req, res) {
        try {
            const item = await this.service.findById(req.params.id);
            if (!item) {
                res.status(404).json({
                    success: false,
                    message: "Item não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: item
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
    async findByIdentifier(req, res) {
        try {
            const item = await this.service.findByIdentifier(req.params.identifier);
            if (!item) {
                res.status(404).json({
                    success: false,
                    message: "Item não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: item
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
exports.ItemController = ItemController;
