import { Router, Request, Response } from "express";

import { EconomyService } from "./EconomyService";

export class EconomyController {

    public readonly router = Router();

    private readonly service = new EconomyService();

    constructor() {

        this.initializeRoutes();

    }

    private initializeRoutes(): void {

        this.router.post(
            "/account",
            this.createAccount.bind(this)
        );

        this.router.get(
            "/account/:characterId",
            this.findByCharacter.bind(this)
        );

        this.router.post(
            "/deposit",
            this.deposit.bind(this)
        );

        this.router.post(
            "/withdraw",
            this.withdraw.bind(this)
        );

    }

    private async createAccount(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.createAccount(
                req.body.characterId
            );

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

    private async findByCharacter(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.findByCharacter(
                req.params.characterId
            );

            if (!account) {

                res.status(404).json({

                    success: false,

                    message: "Conta bancária não encontrada."

                });

                return;

            }

            res.status(200).json({

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

    private async deposit(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.deposit(
                req.body
            );

            res.status(200).json({

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

    private async withdraw(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const account = await this.service.withdraw(
                req.body
            );

            res.status(200).json({

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

}