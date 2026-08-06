"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiCheatController = void 0;
const AntiCheatService_1 = require("./AntiCheatService");
class AntiCheatController {
    service;
    constructor() {
        this.service =
            new AntiCheatService_1.AntiCheatService();
    }
    async create(req, res) {
        try {
            const event = await this.service.createEvent(req.body);
            return res.json(event);
        }
        catch (error) {
            console.error("[ANTICHEAT ERROR]", error);
            return res.status(500)
                .json({
                error: "Erro ao salvar evento"
            });
        }
    }
}
exports.AntiCheatController = AntiCheatController;
