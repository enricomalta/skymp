"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestService = void 0;
const QuestRepository_1 = require("./QuestRepository");
class QuestService {
    repository = new QuestRepository_1.QuestRepository();
    async createQuest(dto) {
        const exists = await this.repository.findByIdentifier(dto.identifier);
        if (exists) {
            throw new Error("Já existe uma quest com este identificador.");
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
exports.QuestService = QuestService;
