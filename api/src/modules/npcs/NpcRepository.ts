import { CreateNpcDto } from "./dto/CreateNpcDto";
import { Npc } from "./models/Npc";
import { NpcModel } from "./schemas/NpcSchema";

export class NpcRepository {

    public async create(
        dto: CreateNpcDto
    ): Promise<Npc> {

        const created = await NpcModel.create({

            identifier: dto.identifier,

            name: dto.name,

            race: dto.race,

            location: dto.location

        });

        return {

            id: created.id,

            identifier: created.identifier,

            name: created.name,

            race: created.race,

            location: created.location,

            enabled: created.enabled,

            createdAt: created.createdAt

        };

    }

    public async findById(
        id: string
    ): Promise<Npc | null> {

        const npc = await NpcModel.findById(id);

        if (!npc) {

            return null;

        }

        return {

            id: npc.id,

            identifier: npc.identifier,

            name: npc.name,

            race: npc.race,

            location: npc.location,

            enabled: npc.enabled,

            createdAt: npc.createdAt

        };

    }

    public async findByIdentifier(
        identifier: string
    ): Promise<Npc | null> {

        const npc = await NpcModel.findOne({

            identifier

        });

        if (!npc) {

            return null;

        }

        return {

            id: npc.id,

            identifier: npc.identifier,

            name: npc.name,

            race: npc.race,

            location: npc.location,

            enabled: npc.enabled,

            createdAt: npc.createdAt

        };

    }

    public async findAll(): Promise<Npc[]> {

        const npcs = await NpcModel.find();

        return npcs.map(npc => ({

            id: npc.id,

            identifier: npc.identifier,

            name: npc.name,

            race: npc.race,

            location: npc.location,

            enabled: npc.enabled,

            createdAt: npc.createdAt

        }));

    }

}