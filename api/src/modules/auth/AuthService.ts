import bcrypt from "bcrypt";

import { AuthRepository } from "./AuthRepository";

import { Account } from "./models/Account";

import { CreateAccountDto } from "./dto/CreateAccountDto";
import { LoginDto } from "./dto/LoginDto";
import { JwtService } from "./JwtService";
import { LoginResponseDto } from "./dto/LoginResponseDto";
import { ValidateTokenResponseDto } from "./dto/ValidateTokenResponseDto";
export class AuthService {

    private readonly repository = new AuthRepository();

    private readonly jwtService = new JwtService();

    public async createAccount(
        dto: CreateAccountDto
    ): Promise<Account> {

        const exists = await this.repository.findByEmail(
            dto.email
        );

        if (exists) {

            throw new Error("Email já cadastrado.");

        }

        const password = await bcrypt.hash(dto.password, 10);

        return this.repository.create({

            email: dto.email,

            password

        });

    }

    public async login(
        dto: LoginDto
    ): Promise<LoginResponseDto> {

        const account = await this.repository.findByEmail(
            dto.email
        );

        if (!account) {

            throw new Error("Usuário não encontrado.");

        }

        const valid = await bcrypt.compare(

            dto.password,

            account.password

        );

        if (!valid) {

            throw new Error("Senha inválida.");

        }

        const jwtService = new JwtService();

        const token = jwtService.generate(
            account
        );

        return {

            token,

            account: {

                id: account.id,

                email: account.email,

                createdAt: account.createdAt

            }

        };

    }

    public async findByEmail(
        email: string
    ): Promise<Account | null> {

        return this.repository.findByEmail(
            email
        );

    }

    public async validate(
        token: string
    ): Promise<ValidateTokenResponseDto> {

        const payload = this.jwtService.validate(
            token
        );

        const account = await this.repository.findById(
            payload.accountId
        );

        if (!account) {

            throw new Error(
                "Conta não encontrada."
            );

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

    public async getSkyMpProfile(token: string): Promise<{ id: number; discordId: null }> {

        const payload = this.jwtService.validate(token);
        const profileId = await this.repository.getOrAssignProfileId(payload.accountId);

        return {
            id: profileId,
            discordId: null
        };

    }

}
