"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRepository = void 0;
const CharacterSchema_1 = require("./schemas/CharacterSchema");
class CharacterRepository {
    async create(character) {
        const created = await CharacterSchema_1.CharacterModel.create(character);
        return {
            id: created.id,
            profileId: created.profileId,
            accountId: created.accountId.toString(),
            name: created.name,
            race: created.race,
            sex: created.sex,
            level: created.level,
            position: created.position,
            rotation: created.rotation,
            world: created.world,
            cell: created.cell,
            health: created.health,
            magicka: created.magicka,
            stamina: created.stamina,
            gold: created.gold,
            experience: created.experience,
            appearance: created.appearance,
            inventory: created.inventory,
            equipment: created.equipment,
            skills: created.skills,
            attributes: created.attributes,
            stats: created.stats,
            quests: created.quests,
            factions: created.factions,
            location: created.location,
            isDead: created.isDead,
            jail: created.jail,
            housing: created.housing,
            bank: created.bank,
            weight: created.weight,
            maxWeight: created.maxWeight,
            reputation: created.reputation,
            skillPoints: created.skillPoints,
            perkPoints: created.perkPoints,
            lastSave: created.lastSave,
            createdAt: created.createdAt,
            lastLogin: created.lastLogin,
            lastLogout: created.lastLogout
        };
    }
    async findByName(name) {
        const character = await CharacterSchema_1.CharacterModel.findOne({
            name
        });
        if (!character) {
            return null;
        }
        return {
            id: character.id,
            profileId: character.profileId,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            position: character.position,
            rotation: character.rotation,
            world: character.world,
            cell: character.cell,
            health: character.health,
            magicka: character.magicka,
            stamina: character.stamina,
            gold: character.gold,
            experience: character.experience,
            appearance: character.appearance,
            inventory: character.inventory,
            equipment: character.equipment,
            skills: character.skills,
            attributes: character.attributes,
            stats: character.stats,
            quests: character.quests,
            factions: character.factions,
            location: character.location,
            isDead: character.isDead,
            jail: character.jail,
            housing: character.housing,
            bank: character.bank,
            weight: character.weight,
            maxWeight: character.maxWeight,
            reputation: character.reputation,
            skillPoints: character.skillPoints,
            perkPoints: character.perkPoints,
            lastSave: character.lastSave,
            createdAt: character.createdAt,
            lastLogin: character.lastLogin,
            lastLogout: character.lastLogout
        };
    }
    async findById(id) {
        const character = await CharacterSchema_1.CharacterModel.findById(id);
        if (!character) {
            return null;
        }
        return {
            id: character.id,
            profileId: character.profileId,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            position: character.position,
            rotation: character.rotation,
            world: character.world,
            cell: character.cell,
            health: character.health,
            magicka: character.magicka,
            stamina: character.stamina,
            gold: character.gold,
            experience: character.experience,
            appearance: character.appearance,
            inventory: character.inventory,
            equipment: character.equipment,
            skills: character.skills,
            attributes: character.attributes,
            stats: character.stats,
            quests: character.quests,
            factions: character.factions,
            location: character.location,
            isDead: character.isDead,
            jail: character.jail,
            housing: character.housing,
            bank: character.bank,
            weight: character.weight,
            maxWeight: character.maxWeight,
            reputation: character.reputation,
            skillPoints: character.skillPoints,
            perkPoints: character.perkPoints,
            lastSave: character.lastSave,
            createdAt: character.createdAt,
            lastLogin: character.lastLogin,
            lastLogout: character.lastLogout
        };
    }
    async findByAccount(accountId) {
        const characters = await CharacterSchema_1.CharacterModel.find({
            accountId
        });
        return characters.map(character => ({
            id: character.id,
            profileId: character.profileId,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            position: character.position,
            rotation: character.rotation,
            world: character.world,
            cell: character.cell,
            health: character.health,
            magicka: character.magicka,
            stamina: character.stamina,
            gold: character.gold,
            experience: character.experience,
            appearance: character.appearance,
            inventory: character.inventory,
            equipment: character.equipment,
            skills: character.skills,
            attributes: character.attributes,
            stats: character.stats,
            quests: character.quests,
            factions: character.factions,
            location: character.location,
            isDead: character.isDead,
            jail: character.jail,
            housing: character.housing,
            bank: character.bank,
            weight: character.weight,
            maxWeight: character.maxWeight,
            reputation: character.reputation,
            skillPoints: character.skillPoints,
            perkPoints: character.perkPoints,
            lastSave: character.lastSave,
            createdAt: character.createdAt,
            lastLogin: character.lastLogin,
            lastLogout: character.lastLogout
        }));
    }
    async findByProfileId(profileId) {
        const character = await CharacterSchema_1.CharacterModel.findOne({
            profileId
        });
        if (!character) {
            return null;
        }
        return {
            id: character.id,
            profileId: character.profileId,
            accountId: character.accountId.toString(),
            name: character.name,
            race: character.race,
            sex: character.sex,
            level: character.level,
            position: character.position,
            rotation: character.rotation,
            world: character.world,
            cell: character.cell,
            health: character.health,
            magicka: character.magicka,
            stamina: character.stamina,
            gold: character.gold,
            experience: character.experience,
            appearance: character.appearance,
            inventory: character.inventory,
            equipment: character.equipment,
            skills: character.skills,
            attributes: character.attributes,
            stats: character.stats,
            quests: character.quests,
            factions: character.factions,
            location: character.location,
            isDead: character.isDead,
            jail: character.jail,
            housing: character.housing,
            bank: character.bank,
            weight: character.weight,
            maxWeight: character.maxWeight,
            reputation: character.reputation,
            skillPoints: character.skillPoints,
            perkPoints: character.perkPoints,
            lastSave: character.lastSave,
            createdAt: character.createdAt,
            lastLogin: character.lastLogin,
            lastLogout: character.lastLogout
        };
    }
    async update(id, character) {
        const updated = await CharacterSchema_1.CharacterModel.findByIdAndUpdate(id, character, {
            returnDocument: "after"
        });
        if (!updated) {
            return null;
        }
        return {
            id: updated.id,
            profileId: updated.profileId,
            accountId: updated.accountId.toString(),
            name: updated.name,
            race: updated.race,
            sex: updated.sex,
            level: updated.level,
            position: updated.position,
            rotation: updated.rotation,
            world: updated.world,
            cell: updated.cell,
            health: updated.health,
            magicka: updated.magicka,
            stamina: updated.stamina,
            gold: updated.gold,
            experience: updated.experience,
            appearance: updated.appearance,
            inventory: updated.inventory,
            equipment: updated.equipment,
            skills: updated.skills,
            attributes: updated.attributes,
            stats: updated.stats,
            quests: updated.quests,
            factions: updated.factions,
            location: updated.location,
            isDead: updated.isDead,
            jail: updated.jail,
            housing: updated.housing,
            bank: updated.bank,
            weight: updated.weight,
            maxWeight: updated.maxWeight,
            reputation: updated.reputation,
            skillPoints: updated.skillPoints,
            perkPoints: updated.perkPoints,
            lastSave: updated.lastSave,
            createdAt: updated.createdAt,
            lastLogin: updated.lastLogin,
            lastLogout: updated.lastLogout
        };
    }
    async save(character) {
        const updated = await CharacterSchema_1.CharacterModel.findByIdAndUpdate(character.id, character, {
            returnDocument: "after",
            runValidators: true
        });
        if (!updated) {
            throw new Error("Personagem não encontrado.");
        }
        return {
            id: updated.id,
            profileId: updated.profileId,
            accountId: updated.accountId.toString(),
            name: updated.name,
            race: updated.race,
            sex: updated.sex,
            level: updated.level,
            position: updated.position,
            rotation: updated.rotation,
            world: updated.world,
            cell: updated.cell,
            appearance: updated.appearance,
            inventory: updated.inventory,
            equipment: updated.equipment,
            attributes: updated.attributes,
            skills: updated.skills,
            stats: updated.stats,
            quests: updated.quests,
            factions: updated.factions,
            location: updated.location,
            isDead: updated.isDead,
            jail: updated.jail,
            housing: updated.housing,
            bank: updated.bank,
            weight: updated.weight,
            maxWeight: updated.maxWeight,
            reputation: updated.reputation,
            skillPoints: updated.skillPoints,
            perkPoints: updated.perkPoints,
            lastSave: updated.lastSave,
            lastLogin: updated.lastLogin,
            lastLogout: updated.lastLogout,
            createdAt: updated.createdAt
        };
    }
}
exports.CharacterRepository = CharacterRepository;
