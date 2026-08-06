"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestController = void 0;
const express_1 = require("express");
const QuestService_1 = require("./QuestService");
class QuestController {
    router = (0, express_1.Router)();
    service = new QuestService_1.QuestService();
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
            const quest = await this.service.createQuest(req.body);
            res.status(201).json({
                success: true,
                data: quest
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
            const quests = await this.service.findAll();
            res.status(200).json({
                success: true,
                data: quests
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
            const quest = await this.service.findById(req.params.id);
            if (!quest) {
                res.status(404).json({
                    success: false,
                    message: "Quest não encontrada."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: quest
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
            const quest = await this.service.findByIdentifier(req.params.identifier);
            if (!quest) {
                res.status(404).json({
                    success: false,
                    message: "Quest não encontrada."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: quest
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
exports.QuestController = QuestController;
