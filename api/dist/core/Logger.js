"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pino_1 = __importDefault(require("pino"));
class Logger {
    static logger = (0, pino_1.default)({
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
    static log(level, context, message, data) {
        if (data !== undefined) {
            this.logger[level](data, `[${context}] ${message}`);
        }
        else {
            this.logger[level](`[${context}] ${message}`);
        }
    }
    static info(context, message, data) {
        this.log("info", context, message, data);
    }
    static warn(context, message, data) {
        this.log("warn", context, message, data);
    }
    static error(context, message, data) {
        this.log("error", context, message, data);
    }
    static debug(context, message, data) {
        this.log("debug", context, message, data);
    }
    static fatal(context, message, data) {
        this.log("fatal", context, message, data);
    }
}
exports.Logger = Logger;
