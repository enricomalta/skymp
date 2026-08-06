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

    public async getOrAssignProfileId(accountId: string): Promise<number> {

        const account = await AccountModel.findById(accountId);

        if (!account) {
            throw new Error("Conta n\u00e3o encontrada.");
        }

        if (typeof account.profileId === "number") {
            return account.profileId;
        }

        // The existing installation only has the administrator account. Giving
        // the first unmapped account profile 1 preserves its current character.
        const latest = await AccountModel
            .findOne({ profileId: { $type: "double" } })
            .sort({ profileId: -1 })
            .select({ profileId: 1 });

        account.profileId = (latest?.profileId ?? 0) + 1;

        try {
            await account.save();
        } catch (error: unknown) {
            // A concurrent first login may allocate the same value. Fetch the
            // document again before surfacing an actual persistence error.
            const refreshed = await AccountModel.findById(accountId);
            if (typeof refreshed?.profileId === "number") {
                return refreshed.profileId;
            }
            throw error;
        }

        return account.profileId;

    }

}
