import { Request, Response } from "express";
import { AntiCheatService } from "./AntiCheatService";


export class AntiCheatController
{

    private service: AntiCheatService;


    constructor()
    {
        this.service =
            new AntiCheatService();
    }


    async create(
        req: Request,
        res: Response
    )
    {

        try
        {

            const event =
                await this.service.createEvent(
                    req.body
                );


            return res.json(event);

        }
        catch(error)
        {

            console.error(
                "[ANTICHEAT ERROR]",
                error
            );


            return res.status(500)
                .json({
                    error:
                    "Erro ao salvar evento"
                });

        }

    }

}