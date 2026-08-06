"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcController = void 0;
const express_1 = require("express");
const NpcService_1 = require("./NpcService");
class NpcController {
    router = (0, express_1.Router)();
    service = new NpcService_1.NpcService();
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
            const npc = await this.service.createNpc(req.body);
            res.status(201).json({
                success: true,
                data: npc
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
            const npcs = await this.service.findAll();
            res.status(200).json({
                success: true,
                data: npcs
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
            const npc = await this.service.findById(req.params.id);
            if (!npc) {
                res.status(404).json({
                    success: false,
                    message: "NPC não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: npc
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
            const npc = await this.service.findByIdentifier(req.params.identifier);
            if (!npc) {
                res.status(404).json({
                    success: false,
                    message: "NPC não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: npc
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
exports.NpcController = NpcController;
