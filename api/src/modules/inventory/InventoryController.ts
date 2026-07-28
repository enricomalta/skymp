import { Router, Request, Response } from "express";

import { InventoryService } from "./InventoryService";

export class InventoryController {

    public readonly router = Router();

    private readonly service = new InventoryService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/",
            this.create.bind(this)
        );

        this.router.get(
            "/:characterId",
            this.findByCharacter.bind(this)
        );

        this.router.post(
            "/add-item",
            this.addItem.bind(this)
        );

        this.router.post(
            "/remove-item",
            this.removeItem.bind(this)
        );

    }

    private async create(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const inventory = await this.service.createInventory(
                req.body.characterId
            );

            res.status(201).json({

                success: true,

                data: inventory

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

            const inventory = await this.service.findByCharacter(
                req.params.characterId
            );

            if (!inventory) {

                res.status(404).json({

                    success: false,

                    message: "Inventário não encontrado."

                });

                return;

            }

            res.status(200).json({

                success: true,

                data: inventory

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

    private async addItem(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const inventory = await this.service.addItem(
                req.body
            );

            res.status(200).json({

                success: true,

                data: inventory

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

    private async removeItem(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const inventory = await this.service.removeItem(
                req.body
            );

            res.status(200).json({

                success: true,

                data: inventory

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