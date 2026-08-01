import { Router, Request, Response } from "express";

import { PlayerQuestService } from "./PlayerQuestService";

export class PlayerQuestController {

    public readonly router = Router();

    private readonly service = new PlayerQuestService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/accept",
            this.acceptQuest.bind(this)
        );

        this.router.get(
            "/:characterId",
            this.findByCharacter.bind(this)
        );

        this.router.post(
            "/progress",
            this.updateProgress.bind(this)
        );

        this.router.post(
            "/complete",
            this.completeQuest.bind(this)
        );

    }

    private async acceptQuest(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const quest = await this.service.acceptQuest(
                req.body
            );

            res.status(201).json({

                success: true,

                data: quest

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

    private async findByCharacter(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const quests = await this.service.findByCharacter(
                req.params.characterId
            );

            res.status(200).json({

                success: true,

                data: quests

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

    private async updateProgress(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const quest = await this.service.updateProgress(
                req.body
            );

            res.status(200).json({

                success: true,

                data: quest

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

    private async completeQuest(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const quest = await this.service.completeQuest(
                req.body
            );

            res.status(200).json({

                success: true,

                data: quest

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