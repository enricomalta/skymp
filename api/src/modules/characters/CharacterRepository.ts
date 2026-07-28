import { Character } from "./models/Character";
import { CharacterModel } from "./schemas/CharacterSchema";

export class CharacterRepository {

    public async create(
        character: Partial<Character>
    ): Promise<Character> {

        const created = await CharacterModel.create(character);

        return {
            id: created.id,
            accountId: created.accountId.toString(),
            name: created.name,
            race: created.race,
            sex: created.sex,
            level: created.level,
            createdAt: created.createdAt
        };

    }

    public async findByName(
        name: string
    ): Promise<Character | null> {

        const character = await CharacterModel.findOne({
            name
        });

        if (!character) {

            return null;

        }

        return {
            id: character.id,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            createdAt: character.createdAt
        };

    }

    public async findById(
        id: string
    ): Promise<Character | null> {

        const character = await CharacterModel.findById(id);

        if (!character) {

            return null;

        }

        return {
            id: character.id,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            createdAt: character.createdAt
        };

    }

    public async findByAccount(
        accountId: string
    ): Promise<Character[]> {

        const characters = await CharacterModel.find({
            accountId
        });

        return characters.map(character => ({
            id: character.id,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            createdAt: character.createdAt
        }));

    }

}