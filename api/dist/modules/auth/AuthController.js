"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const AuthService_1 = require("./AuthService");
class AuthController {
    router = (0, express_1.Router)();
    service = new AuthService_1.AuthService();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/register", this.register.bind(this));
        this.router.post("/login", this.login.bind(this));
        this.router.post("/validate", this.validate.bind(this));
    }
    async register(req, res) {
        try {
            const account = await this.service.createAccount(req.body);
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
    async login(req, res) {
        try {
            const account = await this.service.login(req.body);
            res.status(200).json({
                success: true,
                data: account
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });
        }
    }
    async validate(req, res) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                res.status(401).json({
                    success: false,
                    message: "Token não informado."
                });
                return;
            }
            const token = authorization.replace("Bearer ", "");
            const account = await this.service.validate(token);
            res.status(200).json({
                success: true,
                data: account
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Token inválido."
            });
        }
    }
}
exports.AuthController = AuthController;
