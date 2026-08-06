"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcService = void 0;
const NpcRepository_1 = require("./NpcRepository");
class NpcService {
    repository = new NpcRepository_1.NpcRepository();
    async createNpc(dto) {
        const exists = await this.repository.findByIdentifier(dto.identifier);
        if (exists) {
            throw new Error("Já existe um NPC com este identificador.");
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
exports.NpcService = NpcService;
