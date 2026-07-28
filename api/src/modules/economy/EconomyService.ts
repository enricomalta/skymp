import { EconomyRepository } from "./EconomyRepository";

import { BankAccount } from "./models/BankAccount";

import { DepositDto } from "./dto/DepositDto";
import { WithdrawDto } from "./dto/WithdrawDto";

import { InventoryService } from "../inventory/InventoryService";

export class EconomyService {

    private readonly repository = new EconomyRepository();

    private readonly inventoryService = new InventoryService();

    private readonly GOLD_ITEM_ID = "gold_coin";

    public async createAccount(
        characterId: string
    ): Promise<BankAccount> {

        const exists = await this.repository.findByCharacter(
            characterId
        );

        if (exists) {

            throw new Error(
                "Este personagem já possui uma conta bancária."
            );

        }

        return this.repository.create(characterId);

    }

    public async findByCharacter(
        characterId: string
    ): Promise<BankAccount | null> {

        return this.repository.findByCharacter(characterId);

    }

    public async deposit(
        dto: DepositDto
    ): Promise<BankAccount> {

        const account = await this.repository.findByCharacter(
            dto.characterId
        );

        if (!account) {

            throw new Error(
                "Conta bancária não encontrada."
            );

        }

        await this.inventoryService.removeItem({

            characterId: dto.characterId,

            itemId: this.GOLD_ITEM_ID,

            quantity: dto.amount

        });

        account.balance += dto.amount;

        return this.repository.update(account);

    }

    public async withdraw(
        dto: WithdrawDto
    ): Promise<BankAccount> {

        const account = await this.repository.findByCharacter(
            dto.characterId
        );

        if (!account) {

            throw new Error(
                "Conta bancária não encontrada."
            );

        }

        if (account.balance < dto.amount) {

            throw new Error(
                "Saldo insuficiente."
            );

        }

        account.balance -= dto.amount;

        await this.inventoryService.addItem({

            characterId: dto.characterId,

            itemId: this.GOLD_ITEM_ID,

            quantity: dto.amount

        });

        return this.repository.update(account);

    }

}