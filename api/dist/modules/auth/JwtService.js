"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    secret;
    constructor() {
        this.secret = process.env.JWT_SECRET ?? "terras-alem-dev-secret";
    }
    generate(account) {
        return jsonwebtoken_1.default.sign({
            accountId: account.id,
            email: account.email
        }, this.secret, {
            expiresIn: "7d"
        });
    }
    validate(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.JwtService = JwtService;
