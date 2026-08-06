"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const Config_1 = require("../config/Config");
const Logger_1 = require("../core/Logger");
const LoggerContext_1 = require("../core/types/LoggerContext");
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(Config_1.Config.database.uri);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.DATABASE, "MongoDB conectado.");
    }
    catch (error) {
        Logger_1.Logger.fatal(LoggerContext_1.LoggerContext.DATABASE, "Falha ao conectar ao MongoDB.", error);
        process.exit(1);
    }
}
