"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const ItemRepository_1 = require("./ItemRepository");
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
class ItemService {
    repository = new ItemRepository_1.ItemRepository();
    async createItem(dto) {
        const exists = await this.repository.findByIdentifier(dto.identifier);
        if (exists) {
            throw new Error("Já existe um item com este identificador.");
        }
        return this.repository.create(dto);
    }
    async findById(id) {
        return this.repository.findById(id);
    }
    async findByIdentifier(identifier) {
        return this.repository.findByIdentifier(identifier);
    }
    async findAll() {
        return this.repository.findAll();
    }
}
exports.ItemService = ItemService;
