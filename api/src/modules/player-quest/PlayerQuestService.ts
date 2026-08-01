import { CharacterService } from "../characters/CharacterService";
import { EconomyService } from "../economy/EconomyService";
import { InventoryService } from "../inventory/InventoryService";
import { QuestService } from "../quests/QuestService";

import { AcceptQuestDto } from "./dto/AcceptQuestDto";
import { CompleteQuestDto } from "./dto/CompleteQuestDto";
import { UpdateProgressDto } from "./dto/UpdateProgressDto";

import { PlayerQuest } from "./models/PlayerQuest";
import { QuestStatus } from "./models/QuestStatus";

import { PlayerQuestRepository } from "./PlayerQuestRepository";

export class PlayerQuestService {

    private readonly repository = new PlayerQuestRepository();

    private readonly questService = new QuestService();

    private readonly characterService = new CharacterService();

    private readonly inventoryService = new InventoryService();

    private readonly economyService = new EconomyService();

    public async acceptQuest(
        dto: AcceptQuestDto
    ): Promise<PlayerQuest> {

        const quest = await this.questService.findByIdentifier(
            dto.questIdentifier
        );

        if (!quest) {

            throw new Error(
                "Quest não encontrada."
            );

        }

        const exists = await this.repository.findByCharacterAndQuest(

            dto.characterId,

            quest.id

        );

        if (exists) {

            throw new Error(
                "Quest já aceita."
            );

        }

        return this.repository.create({

            characterId: dto.characterId,

            questId: quest.id,

            progress: 0,

            requiredProgress: quest.requiredProgress,

            status: QuestStatus.IN_PROGRESS,

            startedAt: new Date()

        });

    }

    public async findByCharacter(
        characterId: string
    ): Promise<PlayerQuest[]> {

        return this.repository.findByCharacter(
            characterId
        );

    }

    public async updateProgress(
        dto: UpdateProgressDto
    ): Promise<PlayerQuest> {

        const quest = await this.questService.findByIdentifier(
            dto.questIdentifier
        );

        if (!quest) {

            throw new Error(
                "Quest não encontrada."
            );

        }

        const playerQuest =
            await this.repository.findByCharacterAndQuest(

                dto.characterId,

                quest.id

            );

        if (!playerQuest) {

            throw new Error(
                "Quest não iniciada."
            );

        }

        playerQuest.progress += dto.amount;

        return this.repository.update(
            playerQuest
        );

    }

    public async completeQuest(
        dto: CompleteQuestDto
    ): Promise<PlayerQuest> {

        const quest = await this.questService.findByIdentifier(
            dto.questIdentifier
        );

        if (!quest) {

            throw new Error(
                "Quest não encontrada."
            );

        }

        const playerQuest =
            await this.repository.findByCharacterAndQuest(

                dto.characterId,

                quest.id

            );

        if (!playerQuest) {

            throw new Error(
                "Quest não iniciada."
            );

        }

        if (
            playerQuest.progress <
            playerQuest.requiredProgress
        ) {

            throw new Error(
                "Objetivo ainda não concluído."
            );

        }

        playerQuest.status = QuestStatus.COMPLETED;

        playerQuest.completedAt = new Date();

        await this.inventoryService.addItem({

            characterId: dto.characterId,

            itemId: "gold_coin",

            quantity: quest.rewardGold

        });

        return this.repository.update(
            playerQuest
        );

    }

}