import pino from "pino";
import { LoggerContext } from "./types/LoggerContext";

export class Logger {

    private static logger = pino({

        level: process.env.NODE_ENV === "production"
            ? "info"
            : "debug",

        transport: {

            target: "pino-pretty",

            options: {

                colorize: true,

                translateTime: "HH:MM:ss",

                ignore: "pid,hostname"

            }

        }

    });

    private static log(
        level: "info" | "warn" | "error" | "debug" | "fatal",
        context: LoggerContext,
        message: string,
        data?: unknown
    ) {
        if (data !== undefined) {
            this.logger[level](data, `[${context}] ${message}`);
        } else {
            this.logger[level](`[${context}] ${message}`);
        }
    }

    public static info(context: LoggerContext, message: string, data?: unknown) {
        this.log("info", context, message, data);
    }

    public static warn(context: LoggerContext, message: string, data?: unknown) {
        this.log("warn", context, message, data);
    }

    public static error(context: LoggerContext, message: string, data?: unknown) {
        this.log("error", context, message, data);
    }

    public static debug(context: LoggerContext, message: string, data?: unknown) {
        this.log("debug", context, message, data);
    }

    public static fatal(context: LoggerContext, message: string, data?: unknown) {
        this.log("fatal", context, message, data);
    }

}