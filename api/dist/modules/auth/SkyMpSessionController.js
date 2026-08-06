"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyMpSessionController = void 0;
const express_1 = require("express");
const AuthService_1 = require("./AuthService");
/**
 * Adapter for SkyMP's master-session contract. The "session" is the JWT
 * created by the Terras Alem launcher; validation remains server-side.
 */
class SkyMpSessionController {
    router = (0, express_1.Router)();
    service = new AuthService_1.AuthService();
    constructor() {
        this.router.get("/servers/:masterKey/sessions/:session", this.getSession.bind(this));
    }
    async getSession(req, res) {
        try {
            const user = await this.service.getSkyMpProfile(req.params.session);
            res.status(200).json({ user });
        }
        catch {
            // SkyMP treats 404 as an unknown/expired session.
            res.status(404).json({ message: "Sess\u00e3o inv\u00e1lida ou expirada." });
        }
    }
}
exports.SkyMpSessionController = SkyMpSessionController;
