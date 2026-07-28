import bcrypt from "bcrypt";

import { AuthRepository } from "./AuthRepository";

import { Account } from "./models/Account";

import { CreateAccountDto } from "./dto/CreateAccountDto";
import { LoginDto } from "./dto/LoginDto";

export class AuthService {

    private readonly repository = new AuthRepository();

    public async createAccount(
        dto: CreateAccountDto
    ): Promise<Account> {

        const exists = await this.repository.findByUsername(
            dto.username
        );

        if (exists) {

            throw new Error("Nome de usuário já existe.");

        }

        const password = await bcrypt.hash(dto.password, 10);

        return this.repository.create({

            username: dto.username,

            password

        });

    }

    public async login(
        dto: LoginDto
    ): Promise<Account> {

        const account = await this.repository.findByUsername(
            dto.username
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

        return account;

    }

    public async findByUsername(
        username: string
    ): Promise<Account | null> {

        return this.repository.findByUsername(
            username
        );

    }

}