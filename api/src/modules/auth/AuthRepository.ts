import { Account } from "./models/Account";
import { AccountModel } from "./schemas/AccountSchema";

export class AuthRepository {

    public async create(account: Partial<Account>): Promise<Account> {

        const created = await AccountModel.create(account);

        return {
            id: created.id,
            username: created.username,
            password: created.password,
            createdAt: created.createdAt
        };

    }

    public async findByUsername(username: string): Promise<Account | null> {

        const account = await AccountModel.findOne({
            username
        });

        if (!account) {

            return null;

        }

        return {
            id: account.id,
            username: account.username,
            password: account.password,
            createdAt: account.createdAt
        };

    }

}