import { Router, Request, Response } from "express";

import { AuthService } from "./AuthService";

export class AuthController {

    public readonly router = Router();

    private readonly service = new AuthService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/register",
            this.register.bind(this)
        );

        this.router.post(
            "/login",
            this.login.bind(this)
        );

    }

    private async register(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.createAccount(req.body);

            res.status(201).json({
                success: true,
                data: account
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });

        }

    }

    private async login(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.login(req.body);

            res.status(200).json({
                success: true,
                data: account
            });

        } catch (error) {

            res.status(401).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });

        }

    }

}