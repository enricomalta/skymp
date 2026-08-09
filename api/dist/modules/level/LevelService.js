"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelService = void 0;
const Logger_1 = require("../../core/Logger");
const LoggerContext_1 = require("../../core/types/LoggerContext");
const CharacterRepository_1 = require("../characters/CharacterRepository");
const LevelCalculator_1 = require("./LevelCalculator");
class LevelService {
    calculator;
    characterRepository;
    constructor() {
        this.calculator =
            new LevelCalculator_1.LevelCalculator();
        this.characterRepository =
            new CharacterRepository_1.CharacterRepository();
    }
    async addExperience(characterId, amount) {
        this.validateExperienceAmount(amount);
        const character = await this.getCharacter(characterId);
        const previousLevel = character.level;
        const previousExperience = character.experience;
        character.experience += amount;
        character.level =
            this.calculator.getLevelFromExperience(character.experience);
        const levelUps = Math.max(0, character.level - previousLevel);
        await this.characterRepository.save(character);
        if (levelUps > 0) {
            Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, `Personagem "${character.name}" subiu ${levelUps} nivel(is).`, {
                characterId: character.id,
                previousLevel,
                currentLevel: character.level,
                experience: character.experience
            });
        }
        Logger_1.Logger.debug(LoggerContext_1.LoggerContext.SYSTEM, `Personagem "${character.name}" recebeu ${amount} de experiencia.`, {
            characterId: character.id,
            previousExperience,
            currentExperience: character.experience
        });
        return {
            characterId: character.id,
            previousLevel,
            currentLevel: character.level,
            previousExperience,
            currentExperience: character.experience,
            experienceGained: amount,
            levelUps
        };
    }
    async removeExperience(characterId, amount) {
        this.validateExperienceAmount(amount);
        const character = await this.getCharacter(characterId);
        const previousLevel = character.level;
        const previousExperience = character.experience;
        character.experience =
            Math.max(0, character.experience - amount);
        character.level =
            this.calculator.getLevelFromExperience(character.experience);
        const levelDowns = Math.max(0, previousLevel - character.level);
        const experienceLost = previousExperience -
            character.experience;
        await this.characterRepository.save(character);
        if (levelDowns > 0) {
            Logger_1.Logger.warn(LoggerContext_1.LoggerContext.SYSTEM, `Personagem "${character.name}" perdeu ${levelDowns} nivel(is).`, {
                characterId: character.id,
                previousLevel,
                currentLevel: character.level,
                previousExperience,
                currentExperience: character.experience
            });
        }
        return {
            characterId: character.id,
            previousLevel,
            currentLevel: character.level,
            previousExperience,
            currentExperience: character.experience,
            experienceLost,
            levelDowns
        };
    }
    async applyDeathPenalty(characterId, penalty) {
        if (penalty.experienceLossPercent < 0 ||
            penalty.experienceLossPercent > 100) {
            throw new Error("A porcentagem de perda de experiencia deve estar entre 0 e 100.");
        }
        const character = await this.getCharacter(characterId);
        const experienceLost = Math.floor(character.experience *
            (penalty.experienceLossPercent /
                100));
        if (experienceLost === 0) {
            return {
                characterId: character.id,
                previousLevel: character.level,
                currentLevel: character.level,
                previousExperience: character.experience,
                currentExperience: character.experience,
                experienceLost: 0,
                levelDowns: 0
            };
        }
        return this.removeExperience(characterId, experienceLost);
    }
    async getProgress(characterId) {
        const character = await this.getCharacter(characterId);
        const experienceForCurrentLevel = this.calculator.getTotalExperienceForLevel(character.level);
        const experienceForNextLevel = this.calculator.getTotalExperienceForLevel(character.level + 1);
        const experienceIntoLevel = this.calculator.getExperienceProgress(character.level, character.experience);
        const experienceRequiredForLevel = this.calculator.getExperienceRequiredForLevel(character.level);
        return {
            level: character.level,
            experience: character.experience,
            experienceForCurrentLevel,
            experienceForNextLevel,
            experienceIntoLevel,
            experienceRequiredForLevel
        };
    }
    getLevelCalculator() {
        return this.calculator;
    }
    async getCharacter(characterId) {
        const character = await this.characterRepository.findById(characterId);
        if (!character) {
            throw new Error(`Personagem "${characterId}" não encontrado.`);
        }
        return character;
    }
    validateExperienceAmount(amount) {
        if (!Number.isFinite(amount) ||
            amount <= 0) {
            throw new Error("A quantidade de experiencia deve ser maior que zero.");
        }
    }
}
exports.LevelService = LevelService;
