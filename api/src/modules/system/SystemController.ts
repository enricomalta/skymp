import { Router, Request, Response } from "express";

export class SystemController {

    public readonly router = Router();

    constructor() {

        this.router.get(
            "/health",
            this.health.bind(this)
        );

    }

    private async health(
        request: Request,
        response: Response
    ): Promise<void> {

        response.status(200).json({

            status: "ok"

        });

    }

}