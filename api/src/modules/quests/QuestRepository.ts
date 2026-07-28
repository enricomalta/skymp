import { CreateQuestDto } from "./dto/CreateQuestDto";
import { Quest } from "./models/Quest";
import { QuestModel } from "./schemas/QuestSchema";

export class QuestRepository {

    public async create(
        dto: CreateQuestDto
    ): Promise<Quest> {

        const created = await QuestModel.create({

            identifier: dto.identifier,

            name: dto.name,

            description: dto.description,

            npcIdentifier: dto.npcIdentifier

        });

        return {

            id: created.id,

            identifier: created.identifier,

            name: created.name,

            description: created.description,

            npcIdentifier: created.npcIdentifier,

            enabled: created.enabled,

            createdAt: created.createdAt

        };

    }

    public async findById(
        id: string
    ): Promise<Quest | null> {

        const quest = await QuestModel.findById(id);

        if (!quest) {

            return null;

        }

        return {

            id: quest.id,

            identifier: quest.identifier,

            name: quest.name,

            description: quest.description,

            npcIdentifier: quest.npcIdentifier,

            enabled: quest.enabled,

            createdAt: quest.createdAt

        };

    }

    public async findByIdentifier(
        identifier: string
    ): Promise<Quest | null> {

        const quest = await QuestModel.findOne({

            identifier

        });

        if (!quest) {

            return null;

        }

        return {

            id: quest.id,

            identifier: quest.identifier,

            name: quest.name,

            description: quest.description,

            npcIdentifier: quest.npcIdentifier,

            enabled: quest.enabled,

            createdAt: quest.createdAt

        };

    }

    public async findAll(): Promise<Quest[]> {

        const quests = await QuestModel.find();

        return quests.map(quest => ({

            id: quest.id,

            identifier: quest.identifier,

            name: quest.name,

            description: quest.description,

            npcIdentifier: quest.npcIdentifier,

            enabled: quest.enabled,

            createdAt: quest.createdAt

        }));

    }

}