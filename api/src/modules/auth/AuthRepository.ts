import { Account } from "./models/Account";
import { AccountModel } from "./schemas/AccountSchema";

export class AuthRepository {

    public async create(account: Partial<Account>): Promise<Account> {

        const created = await AccountModel.create(account);

        return {
            id: created.id,
            email: created.email,
            password: created.password,
            createdAt: created.createdAt
        };

    }

    public async findByEmail(email: string): Promise<Account | null> {

        const account = await AccountModel.findOne({
            email
        });

        if (!account) {

            return null;

        }

        return {
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt
        };

    }

    public async findById(
        id: string
    ): Promise<Account | null> {

        return AccountModel.findById(
            id
        );

    }

}