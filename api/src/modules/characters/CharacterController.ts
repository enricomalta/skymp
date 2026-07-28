import { Router, Request, Response } from "express";

import { CharacterService } from "./CharacterService";

export class CharacterController {

    public readonly router = Router();

    private readonly service = new CharacterService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/",
            this.create.bind(this)
        );

        this.router.get(
            "/account/:accountId",
            this.findByAccount.bind(this)
        );

        this.router.get(
            "/:id",
            this.findById.bind(this)
        );

    }

    private async create(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const character = await this.service.createCharacter(req.body);

            res.status(201).json({
                success: true,
                data: character
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

    private async findByAccount(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const characters = await this.service.findByAccount(
                req.params.accountId
            );

            res.status(200).json({
                success: true,
                data: characters
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

    private async findById(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const character = await this.service.findById(
                req.params.id
            );

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

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Erro interno."
            });

        }

    }

}