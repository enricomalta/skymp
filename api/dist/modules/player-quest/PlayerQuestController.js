"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQuestController = void 0;
const express_1 = require("express");
const PlayerQuestService_1 = require("./PlayerQuestService");
class PlayerQuestController {
    router = (0, express_1.Router)();
    service = new PlayerQuestService_1.PlayerQuestService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/accept", this.acceptQuest.bind(this));
        this.router.get("/:characterId", this.findByCharacter.bind(this));
        this.router.post("/progress", this.updateProgress.bind(this));
        this.router.post("/complete", this.completeQuest.bind(this));
    }
    async acceptQuest(req, res) {
        try {
            const quest = await this.service.acceptQuest(req.body);
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
    async findByCharacter(req, res) {
        try {
            const quests = await this.service.findByCharacter(req.params.characterId);
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
    async updateProgress(req, res) {
        try {
            const quest = await this.service.updateProgress(req.body);
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
    async completeQuest(req, res) {
        try {
            const quest = await this.service.completeQuest(req.body);
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
exports.PlayerQuestController = PlayerQuestController;
