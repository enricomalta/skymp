"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQuestRepository = void 0;
const PlayerQuestSchema_1 = require("./schemas/PlayerQuestSchema");
class PlayerQuestRepository {
    async create(playerQuest) {
        const created = await PlayerQuestSchema_1.PlayerQuestModel.create(playerQuest);
        return {
            id: created.id,
            characterId: created.characterId,
            questId: created.questId,
            progress: created.progress,
            requiredProgress: created.requiredProgress,
            status: created.status,
            startedAt: created.startedAt,
            completedAt: created.completedAt
        };
    }
    async findByCharacterAndQuest(characterId, questId) {
        const playerQuest = await PlayerQuestSchema_1.PlayerQuestModel.findOne({
            characterId,
            questId
        });
        if (!playerQuest) {
            return null;
        }
        return {
            id: playerQuest.id,
            characterId: playerQuest.characterId,
            questId: playerQuest.questId,
            progress: playerQuest.progress,
            requiredProgress: playerQuest.requiredProgress,
            status: playerQuest.status,
            startedAt: playerQuest.startedAt,
            completedAt: playerQuest.completedAt
        };
    }
    async findByCharacter(characterId) {
        const quests = await PlayerQuestSchema_1.PlayerQuestModel.find({
            characterId
        });
        return quests.map(playerQuest => ({
            id: playerQuest.id,
            characterId: playerQuest.characterId,
            questId: playerQuest.questId,
            progress: playerQuest.progress,
            requiredProgress: playerQuest.requiredProgress,
            status: playerQuest.status,
            startedAt: playerQuest.startedAt,
            completedAt: playerQuest.completedAt
        }));
    }
    async update(playerQuest) {
        const updated = await PlayerQuestSchema_1.PlayerQuestModel.findByIdAndUpdate(playerQuest.id, {
            progress: playerQuest.progress,
            status: playerQuest.status,
            completedAt: playerQuest.completedAt
        }, {
            returnDocument: "after"
        });
        if (!updated) {
            throw new Error("PlayerQuest não encontrada.");
        }
        return {
            id: updated.id,
            characterId: updated.characterId,
            questId: updated.questId,
            progress: updated.progress,
            requiredProgress: updated.requiredProgress,
            status: updated.status,
            startedAt: updated.startedAt,
            completedAt: updated.completedAt
        };
    }
}
exports.PlayerQuestRepository = PlayerQuestRepository;
