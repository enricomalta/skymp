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
        // SkyMP sends this heartbeat every five seconds. This local master does
        // not expose a server browser yet, but acknowledging it keeps the
        // server healthy and leaves room for a future server registry.
        this.router.post("/servers/:masterKey", this.updateServerInfo.bind(this));
        this.router.get("/servers/:masterKey/sessions/:session", this.getSession.bind(this));
    }
    async updateServerInfo(_req, res) {
        res.status(200).json({ success: true });
    }
    async getSession(req, res) {
        try {
            const session = req.params.session;
            if (typeof session !== "string") {
                res.status(404).json({ message: "Sess\u00e3o inv\u00e1lida ou expirada." });
                return;
            }
            const user = await this.service.getSkyMpProfile(session);
            res.status(200).json({ user });
        }
        catch {
            // SkyMP treats 404 as an unknown/expired session.
            res.status(404).json({ message: "Sess\u00e3o inv\u00e1lida ou expirada." });
        }
    }
}
exports.SkyMpSessionController = SkyMpSessionController;
