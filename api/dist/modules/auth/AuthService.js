"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthRepository_1 = require("./AuthRepository");
const JwtService_1 = require("./JwtService");
class AuthService {
    repository = new AuthRepository_1.AuthRepository();
    jwtService = new JwtService_1.JwtService();
    async createAccount(dto) {
        const exists = await this.repository.findByEmail(dto.email);
        if (exists) {
            throw new Error("Email já cadastrado.");
        }
        const password = await bcrypt_1.default.hash(dto.password, 10);
        return this.repository.create({
            email: dto.email,
            password
        });
    }
    async login(dto) {
        const account = await this.repository.findByEmail(dto.email);
        if (!account) {
            throw new Error("Usuário não encontrado.");
        }
        const valid = await bcrypt_1.default.compare(dto.password, account.password);
        if (!valid) {
            throw new Error("Senha inválida.");
        }
        const jwtService = new JwtService_1.JwtService();
        const token = jwtService.generate(account);
        return {
            token,
            account: {
                id: account.id,
                email: account.email,
                createdAt: account.createdAt
            }
        };
    }
    async findByEmail(email) {
        return this.repository.findByEmail(email);
    }
    async validate(token) {
        const payload = this.jwtService.validate(token);
        const account = await this.repository.findById(payload.accountId);
        if (!account) {
            throw new Error("Conta não encontrada.");
        }
        return {
            valid: true,
            account: {
                id: account.id,
                email: account.email,
                createdAt: account.createdAt
            }
        };
    }
    async getSkyMpProfile(token) {
        const payload = this.jwtService.validate(token);
        const profileId = await this.repository.getOrAssignProfileId(payload.accountId);
        return {
            id: profileId,
            discordId: null
        };
    }
}
exports.AuthService = AuthService;
