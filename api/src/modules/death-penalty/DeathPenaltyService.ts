import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import { LevelService } from "../level/LevelService";

import { InventoryService } from "../inventory/InventoryService";

import {
    AddItemDto
} from "../inventory/dto/AddItemDto";

import {
    RemoveItemDto
} from "../inventory/dto/RemoveItemDto";

import {
    DeathCause,
    DeathItemDrop,
    DeathPenaltyPolicy,
    DeathPenaltyResult
} from "./types/DeathPenaltyTypes";

export class DeathPenaltyService {

    public static readonly AMULET_OF_LOSS_ID =
        "amulet_of_loss";

    private readonly levelService:
        LevelService;

    private readonly inventoryService:
        InventoryService;

    private readonly policies:
        Record<DeathCause, DeathPenaltyPolicy> = {

            [DeathCause.PVP]: {

                experienceLossPercent: 5,

                itemDropEnabled: true,

                itemDropCount: 1,

                protectsAmuletOfLoss: true

            },

            [DeathCause.WAR]: {

                experienceLossPercent: 5,

                itemDropEnabled: true,

                itemDropCount: 1,

                protectsAmuletOfLoss: true

            },

            [DeathCause.PK]: {

                experienceLossPercent: 10,

                itemDropEnabled: true,

                itemDropCount: 1,

                protectsAmuletOfLoss: true

            },

            [DeathCause.RED_SKULL]: {

                experienceLossPercent: 15,

                itemDropEnabled: true,

                itemDropCount: 1,

                protectsAmuletOfLoss: false

            }

        };

    constructor() {

        this.levelService =
            new LevelService();

        this.inventoryService =
            new InventoryService();

    }

    public async applyDeathPenalty(
        characterId: string,
        cause: DeathCause
    ): Promise<DeathPenaltyResult> {

        const policy =
            this.policies[cause];

        if (!policy) {

            throw new Error(
                `Política de morte não encontrada para "${cause}".`
            );

        }

        const levelResult =
            await this.levelService.applyDeathPenalty(
                characterId,
                {
                    experienceLossPercent:
                        policy.experienceLossPercent
                }
            );

        let itemsDropped:
            DeathItemDrop[] = [];

        let amuletOfLossProtected =
            false;

        if (
            policy.itemDropEnabled
        ) {

            const dropResult =
                await this.applyItemDrop(
                    characterId,
                    policy
                );

            itemsDropped =
                dropResult.itemsDropped;

            amuletOfLossProtected =
                dropResult.amuletOfLossProtected;

        }

        Logger.warn(
            LoggerContext.SYSTEM,
            `Penalidade de morte aplicada ao personagem "${characterId}".`,
            {
                characterId,
                cause,
                experienceLost:
                    levelResult.experienceLost,
                levelDowns:
                    levelResult.levelDowns,
                itemsDropped,
                amuletOfLossProtected
            }
        );

        return {

            characterId,

            cause,

            experienceLossPercent:
                policy.experienceLossPercent,

            experienceLost:
                levelResult.experienceLost,

            levelDowns:
                levelResult.levelDowns,

            itemsDropped,

            amuletOfLossProtected

        };

    }

    public getPolicy(
        cause: DeathCause
    ): DeathPenaltyPolicy {

        return {
            ...this.policies[cause]
        };

    }

    private async applyItemDrop(
        characterId: string,
        policy: DeathPenaltyPolicy
    ): Promise<{

        itemsDropped: DeathItemDrop[];

        amuletOfLossProtected: boolean;

    }> {

        const inventory =
            await this.inventoryService.findByCharacter(
                characterId
            );

        if (!inventory) {

            return {

                itemsDropped: [],

                amuletOfLossProtected: false

            };

        }

        if (
            inventory.items.length === 0
        ) {

            return {

                itemsDropped: [],

                amuletOfLossProtected: false

            };

        }

        const amulet =
            inventory.items.find(
                item =>
                    item.itemId ===
                    DeathPenaltyService.AMULET_OF_LOSS_ID
            );

        if (
            amulet &&
            policy.protectsAmuletOfLoss
        ) {

            Logger.info(
                LoggerContext.INVENTORY,
                `Amulet of Loss protegeu o inventário do personagem "${characterId}".`
            );

            return {

                itemsDropped: [],

                amuletOfLossProtected: true

            };

        }

        const availableItems =
            inventory.items.filter(
                item =>
                    item.itemId !==
                    DeathPenaltyService.AMULET_OF_LOSS_ID
            );

        if (
            availableItems.length === 0
        ) {

            return {

                itemsDropped: [],

                amuletOfLossProtected: false

            };

        }

        const itemsDropped:
            DeathItemDrop[] = [];

        const dropCount =
            Math.min(
                policy.itemDropCount,
                availableItems.length
            );

        const candidates =
            [...availableItems];

        for (
            let index = 0;
            index < dropCount;
            index++
        ) {

            if (
                candidates.length === 0
            ) {
                break;
            }

            const randomIndex =
                Math.floor(
                    Math.random() *
                    candidates.length
                );

            const item =
                candidates[randomIndex];

            candidates.splice(
                randomIndex,
                1
            );

            const quantity =
                1;

            const removeDto:
                RemoveItemDto = {

                characterId,

                itemId:
                    item.itemId,

                quantity

            };

            await this.inventoryService.removeItem(
                removeDto
            );

            itemsDropped.push({

                itemId:
                    item.itemId,

                quantity

            });

        }

        return {

            itemsDropped,

            amuletOfLossProtected: false

        };

    }

}