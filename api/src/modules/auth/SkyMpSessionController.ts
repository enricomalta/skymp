import { Request, Response, Router } from "express";

import { AuthService } from "./AuthService";

/**
 * Adapter for SkyMP's master-session contract. The "session" is the JWT
 * created by the Terras Alem launcher; validation remains server-side.
 */
export class SkyMpSessionController {

    public readonly router = Router();

    private readonly service = new AuthService();

    constructor() {
        this.router.get(
            "/servers/:masterKey/sessions/:session",
            this.getSession.bind(this)
        );
    }

    private async getSession(req: Request, res: Response): Promise<void> {
        try {
            const session = req.params.session;
            if (typeof session !== "string") {
                res.status(404).json({ message: "Sess\u00e3o inv\u00e1lida ou expirada." });
                return;
            }

            const user = await this.service.getSkyMpProfile(session);
            res.status(200).json({ user });
        } catch {
            // SkyMP treats 404 as an unknown/expired session.
            res.status(404).json({ message: "Sess\u00e3o inv\u00e1lida ou expirada." });
        }
    }

}
