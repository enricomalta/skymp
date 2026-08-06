"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const express_1 = require("express");
const CharacterService_1 = require("./CharacterService");
class CharacterController {
    router = (0, express_1.Router)();
    service = new CharacterService_1.CharacterService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.create.bind(this));
        // Endpoint used by the SkyMP bridge.
        this.router.post("/create", this.create.bind(this));
        this.router.get("/account/:accountId", this.findByAccount.bind(this));
        this.router.get("/load/:profileId", this.load.bind(this));
        this.router.get("/:id", this.findById.bind(this));
        this.router.get("/load/:profileId", this.loadCharacter.bind(this));
        this.router.put("/save/:profileId", this.save.bind(this));
    }
    async create(req, res) {
        try {
            const character = await this.service.createCharacter(req.body);
            res.status(201).json({
                success: true,
                data: character
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
    async findByAccount(req, res) {
        try {
            const characters = await this.service.findByAccount(req.params.accountId);
            res.status(200).json({
                success: true,
                data: characters
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
            const character = await this.service.findById(req.params.id);
            if (!character) {
                res.status(404).json({
                    success: false,
                    message: "Personagem não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: character
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
    async load(req, res) {
        try {
            const profileId = Number(req.params.profileId);
            const character = await this.service.findByProfileId(profileId);
            if (!character) {
                res.status(404).json({
                    success: false,
                    message: "Personagem não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: character
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
    async loadCharacter(req, res) {
        try {
            const profileId = Number(req.params.profileId);
            const character = await this.service.loadCharacter(profileId);
            if (!character) {
                res.status(404).json({
                    success: false,
                    message: "Personagem não encontrado."
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: character
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
    async save(req, res) {
        try {
            const profileId = Number(req.params.profileId);
            if (!Number.isInteger(profileId)) {
                res.status(400).json({ success: false, message: "profileId inválido." });
                return;
            }
            const character = await this.service.saveCharacterByProfileId(profileId, req.body);
            res.status(200).json({
                success: true,
                data: character
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
exports.CharacterController = CharacterController;
