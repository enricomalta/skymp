"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestRepository = void 0;
const QuestSchema_1 = require("./schemas/QuestSchema");
class QuestRepository {
    async create(dto) {
        const created = await QuestSchema_1.QuestModel.create({
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
    async findById(id) {
        const quest = await QuestSchema_1.QuestModel.findById(id);
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
    async findByIdentifier(identifier) {
        const quest = await QuestSchema_1.QuestModel.findOne({
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
    async findAll() {
        const quests = await QuestSchema_1.QuestModel.find();
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
exports.QuestRepository = QuestRepository;
