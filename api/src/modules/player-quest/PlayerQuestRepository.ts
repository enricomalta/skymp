import { PlayerQuest } from "./models/PlayerQuest";
import { PlayerQuestModel } from "./schemas/PlayerQuestSchema";

export class PlayerQuestRepository {

    public async create(
        playerQuest: Partial<PlayerQuest>
    ): Promise<PlayerQuest> {

        const created = await PlayerQuestModel.create(playerQuest);

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

    public async findByCharacterAndQuest(
        characterId: string,
        questId: string
    ): Promise<PlayerQuest | null> {

        const playerQuest = await PlayerQuestModel.findOne({

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

    public async findByCharacter(
        characterId: string
    ): Promise<PlayerQuest[]> {

        const quests = await PlayerQuestModel.find({

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

    public async update(
        playerQuest: PlayerQuest
    ): Promise<PlayerQuest> {

        const updated = await PlayerQuestModel.findByIdAndUpdate(

            playerQuest.id,

            {

                progress: playerQuest.progress,

                status: playerQuest.status,

                completedAt: playerQuest.completedAt

            },

            {

                new: true

            }

        );

        if (!updated) {

            throw new Error(
                "PlayerQuest não encontrada."
            );

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