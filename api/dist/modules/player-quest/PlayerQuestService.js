"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQuestService = void 0;
const CharacterService_1 = require("../characters/CharacterService");
const EconomyService_1 = require("../economy/EconomyService");
const InventoryService_1 = require("../inventory/InventoryService");
const QuestService_1 = require("../quests/QuestService");
const QuestStatus_1 = require("./models/QuestStatus");
const PlayerQuestRepository_1 = require("./PlayerQuestRepository");
class PlayerQuestService {
    repository = new PlayerQuestRepository_1.PlayerQuestRepository();
    questService = new QuestService_1.QuestService();
    characterService = new CharacterService_1.CharacterService();
    inventoryService = new InventoryService_1.InventoryService();
    economyService = new EconomyService_1.EconomyService();
    async acceptQuest(dto) {
        const quest = await this.questService.findByIdentifier(dto.questIdentifier);
        if (!quest) {
            throw new Error("Quest não encontrada.");
        }
        const exists = await this.repository.findByCharacterAndQuest(dto.characterId, quest.id);
        if (exists) {
            throw new Error("Quest já aceita.");
        }
        return this.repository.create({
            characterId: dto.characterId,
            questId: quest.id,
            progress: 0,
            requiredProgress: quest.requiredProgress,
            status: QuestStatus_1.QuestStatus.IN_PROGRESS,
            startedAt: new Date()
        });
    }
    async findByCharacter(characterId) {
        return this.repository.findByCharacter(characterId);
    }
    async updateProgress(dto) {
        const quest = await this.questService.findByIdentifier(dto.questIdentifier);
        if (!quest) {
            throw new Error("Quest não encontrada.");
        }
        const playerQuest = await this.repository.findByCharacterAndQuest(dto.characterId, quest.id);
        if (!playerQuest) {
            throw new Error("Quest não iniciada.");
        }
        playerQuest.progress += dto.amount;
        return this.repository.update(playerQuest);
    }
    async completeQuest(dto) {
        const quest = await this.questService.findByIdentifier(dto.questIdentifier);
        if (!quest) {
            throw new Error("Quest não encontrada.");
        }
        const playerQuest = await this.repository.findByCharacterAndQuest(dto.characterId, quest.id);
        if (!playerQuest) {
            throw new Error("Quest não iniciada.");
        }
        if (playerQuest.progress <
            playerQuest.requiredProgress) {
            throw new Error("Objetivo ainda não concluído.");
        }
        playerQuest.status = QuestStatus_1.QuestStatus.COMPLETED;
        playerQuest.completedAt = new Date();
        await this.inventoryService.addItem({
            characterId: dto.characterId,
            itemId: "gold_coin",
            quantity: quest.rewardGold
        });
        return this.repository.update(playerQuest);
    }
}
exports.PlayerQuestService = PlayerQuestService;
