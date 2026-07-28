import { Router, Request, Response } from "express";

import { NpcService } from "./NpcService";

export class NpcController {

    public readonly router = Router();

    private readonly service = new NpcService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/",
            this.create.bind(this)
        );

        this.router.get(
            "/",
            this.findAll.bind(this)
        );

        this.router.get(
            "/identifier/:identifier",
            this.findByIdentifier.bind(this)
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

            const npc = await this.service.createNpc(
                req.body
            );

            res.status(201).json({

                success: true,

                data: npc

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

    private async findAll(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const npcs = await this.service.findAll();

            res.status(200).json({

                success: true,

                data: npcs

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

            const npc = await this.service.findById(
                req.params.id
            );

            if (!npc) {

                res.status(404).json({

                    success: false,

                    message: "NPC não encontrado."

                });

                return;

            }

            res.status(200).json({

                success: true,

                data: npc

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

    private async findByIdentifier(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const npc = await this.service.findByIdentifier(
                req.params.identifier
            );

            if (!npc) {

                res.status(404).json({

                    success: false,

                    message: "NPC não encontrado."

                });

                return;

            }

            res.status(200).json({

                success: true,

                data: npc

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