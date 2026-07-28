import { CreateItemDto } from "./dto/CreateItemDto";
import { Item } from "./models/Item";
import { ItemRepository } from "./ItemRepository";
/*

Observação importante para a V2

Quero deixar uma decisão arquitetural documentada desde já.

Hoje o campo:

identifier

será algo como:

iron_sword
steel_sword
health_potion
gold_coin

Esse campo será a chave técnica do item.

Isso significa que os outros módulos (Inventory, Loot, Craft, NPC, Merchant, Quest) 
deverão trabalhar utilizando o identifier, e não o nome exibido ao jogador.

Exemplo:

identifier: iron_sword

↓

Nome exibido:
Espada de Ferro

Assim poderemos traduzir o jogo para qualquer idioma no futuro sem alterar referências internas.

*/


export class ItemService {

    private readonly repository = new ItemRepository();

    public async createItem(
        dto: CreateItemDto
    ): Promise<Item> {

        const exists = await this.repository.findByIdentifier(
            dto.identifier
        );

        if (exists) {

            throw new Error(
                "Já existe um item com este identificador."
            );

        }

        return this.repository.create(dto);

    }

    public async findById(
        id: string
    ): Promise<Item | null> {

        return this.repository.findById(id);

    }

    public async findByIdentifier(
        identifier: string
    ): Promise<Item | null> {

        return this.repository.findByIdentifier(identifier);

    }

    public async findAll(): Promise<Item[]> {

        return this.repository.findAll();

    }

}