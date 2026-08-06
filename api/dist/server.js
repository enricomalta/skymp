"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Application_1 = require("./core/Application");
async function bootstrap() {
    const app = new Application_1.Application();
    await app.start();
}
bootstrap();
