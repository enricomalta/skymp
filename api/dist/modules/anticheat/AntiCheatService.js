"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiCheatService = void 0;
const AntiCheatEvent_1 = __importDefault(require("./models/AntiCheatEvent"));
class AntiCheatService {
    async createEvent(data) {
        const event = await AntiCheatEvent_1.default.create(data);
        return event;
    }
}
exports.AntiCheatService = AntiCheatService;
