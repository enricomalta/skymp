import { CreateNpcDto } from "./dto/CreateNpcDto";
import { Npc } from "./models/Npc";
import { NpcRepository } from "./NpcRepository";

export class NpcService {

    private readonly repository = new NpcRepository();

    public async createNpc(
        dto: CreateNpcDto
    ): Promise<Npc> {

        const exists = await this.repository.findByIdentifier(
            dto.identifier
        );

        if (exists) {

            throw new Error(
                "Já existe um NPC com este identificador."
            );

        }

        return this.repository.create(dto);

    }

    public async findById(
        id: string
    ): Promise<Npc | null> {

        return this.repository.findById(id);

    }

    public async findByIdentifier(
        identifier: string
    ): Promise<Npc | null> {

        return this.repository.findByIdentifier(identifier);

    }

    public async findAll(): Promise<Npc[]> {

        return this.repository.findAll();

    }

}