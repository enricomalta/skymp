import { CharacterRepository } from "./CharacterRepository";

import { Character } from "./models/Character";
import { CreateCharacterDto } from "./dto/CreateCharacterDto";

export class CharacterService {

    private readonly repository = new CharacterRepository();

    public async createCharacter(
        dto: CreateCharacterDto
    ): Promise<Character> {

        const exists = await this.repository.findByName(
            dto.name
        );

        if (exists) {

            throw new Error(
                "Já existe um personagem com esse nome."
            );

        }

        return this.repository.create({

            accountId: dto.accountId,

            name: dto.name,

            race: dto.race,

            sex: dto.sex,

            level: 1

        });

    }

    public async findById(
        id: string
    ): Promise<Character | null> {

        return this.repository.findById(id);

    }

    public async findByAccount(
        accountId: string
    ): Promise<Character[]> {

        return this.repository.findByAccount(accountId);

    }

}