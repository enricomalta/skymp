"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyController = void 0;
const express_1 = require("express");
const EconomyService_1 = require("./EconomyService");
class EconomyController {
    router = (0, express_1.Router)();
    service = new EconomyService_1.EconomyService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/account", this.createAccount.bind(this));
        this.router.get("/account/:characterId", this.findByCharacter.bind(this));
        this.router.post("/deposit", this.deposit.bind(this));
        this.router.post("/withdraw", this.withdraw.bind(this));
    }
    async createAccount(req, res) {
        try {
            const account = await this.service.createAccount(req.body.characterId);
            res.status(201).json({
                success: true,
                data: account
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
            const account = await this.service.findByCharacter(req.params.characterId);
            if (!account) {
                res.status(404).json({
                    success: false,
                    message: "Conta bancária não encontrada."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: account
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
    async deposit(req, res) {
        try {
            const account = await this.service.deposit(req.body);
            res.status(200).json({
                success: true,
                data: account
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
    async withdraw(req, res) {
        try {
            const account = await this.service.withdraw(req.body);
            res.status(200).json({
                success: true,
                data: account
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
exports.EconomyController = EconomyController;
