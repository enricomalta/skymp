import { BankAccount } from "./models/BankAccount";
import { BankAccountModel } from "./schemas/BankAccountSchema";

export class EconomyRepository {

    public async create(
        characterId: string
    ): Promise<BankAccount> {

        const created = await BankAccountModel.create({

            characterId,

            balance: 0

        });

        return {

            id: created.id,

            characterId: created.characterId.toString(),

            balance: created.balance,

            createdAt: created.createdAt

        };

    }

    public async findByCharacter(
        characterId: string
    ): Promise<BankAccount | null> {

        const account = await BankAccountModel.findOne({

            characterId

        });

        if (!account) {

            return null;

        }

        return {

            id: account.id,

            characterId: account.characterId.toString(),

            balance: account.balance,

            createdAt: account.createdAt

        };

    }

    public async update(
        account: BankAccount
    ): Promise<BankAccount> {

        const updated = await BankAccountModel.findByIdAndUpdate(

            account.id,

            {

                balance: account.balance

            },

            {

                new: true

            }

        );

        if (!updated) {

            throw new Error(
                "Conta bancária não encontrada."
            );

        }

        return {

            id: updated.id,

            characterId: updated.characterId.toString(),

            balance: updated.balance,

            createdAt: updated.createdAt

        };

    }

}