import { CreateQuestDto } from "./dto/CreateQuestDto";
import { Quest } from "./models/Quest";
import { QuestRepository } from "./QuestRepository";

export class QuestService {

    private readonly repository = new QuestRepository();

    public async createQuest(
        dto: CreateQuestDto
    ): Promise<Quest> {

        const exists = await this.repository.findByIdentifier(
            dto.identifier
        );

        if (exists) {

            throw new Error(
                "Já existe uma quest com este identificador."
            );

        }

        return this.repository.create(dto);

    }

    public async findById(
        id: string
    ): Promise<Quest | null> {

        return this.repository.findById(id);

    }

    public async findByIdentifier(
        identifier: string
    ): Promise<Quest | null> {

        return this.repository.findByIdentifier(identifier);

    }

    public async findAll(): Promise<Quest[]> {

        return this.repository.findAll();

    }

}