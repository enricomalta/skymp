import mongoose from "mongoose";
import { Config } from "../config/Config";
import { Logger } from '../core/Logger';
import { LoggerContext } from "../core/types/LoggerContext";

export async function connectDatabase(): Promise<void> {
    try {
        await mongoose.connect(Config.database.uri!);

        Logger.info(
            LoggerContext.DATABASE,
            "MongoDB conectado."
        );
    } catch (error) {
        Logger.fatal(
            LoggerContext.DATABASE,
            "Falha ao conectar ao MongoDB.",
            error
        );

        process.exit(1);
    }
}