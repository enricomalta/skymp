"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcRepository = void 0;
const NpcSchema_1 = require("./schemas/NpcSchema");
class NpcRepository {
    async create(dto) {
        const created = await NpcSchema_1.NpcModel.create({
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
    async findById(id) {
        const npc = await NpcSchema_1.NpcModel.findById(id);
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
    async findByIdentifier(identifier) {
        const npc = await NpcSchema_1.NpcModel.findOne({
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
    async findAll() {
        const npcs = await NpcSchema_1.NpcModel.find();
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
exports.NpcRepository = NpcRepository;
