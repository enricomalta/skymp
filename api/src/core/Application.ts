import app from "../app";
import { Config } from "../config/Config";
import { connectDatabase } from "../database/connection";
import { Logger } from '../core/Logger';
import { LoggerContext } from "./types/LoggerContext";

export class Application {

    public async start() {

        await this.initializeDatabase();

        this.startHttp();

    }

    private async initializeDatabase() {

        await connectDatabase();

    }

    private startHttp() {

        const port = Number(Config.server.port) || 3000;

        app.listen(port, () => {

            Logger.info(
                LoggerContext.SYSTEM,
                `Terras Alem Core iniciado na porta ${port}`
            );
        });

    }
    
}