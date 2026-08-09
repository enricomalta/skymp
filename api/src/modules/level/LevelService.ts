import { Logger } from "../../core/Logger";
import { LoggerContext } from "../../core/types/LoggerContext";

import { Character } from "../characters/models/Character";
import { CharacterRepository } from "../characters/CharacterRepository";

import {
    DeathPenalty,
    ExperienceLossResult,
    ExperienceResult,
    LevelProgress
} from "./types/LevelTypes";

import { LevelCalculator } from "./LevelCalculator";

export class LevelService {

    private readonly calculator: LevelCalculator;

    private readonly characterRepository: CharacterRepository;

    constructor() {

        this.calculator =
            new LevelCalculator();

        this.characterRepository =
            new CharacterRepository();

    }

    public async addExperience(
        characterId: string,
        amount: number
    ): Promise<ExperienceResult> {

        this.validateExperienceAmount(
            amount
        );

        const character =
            await this.getCharacter(
                characterId
            );

        const previousLevel =
            character.level;

        const previousExperience =
            character.experience;

        character.experience += amount;

        character.level =
            this.calculator.getLevelFromExperience(
                character.experience
            );

        const levelUps =
            Math.max(
                0,
                character.level - previousLevel
            );

        await this.characterRepository.save(
            character
        );

        if (levelUps > 0) {

            Logger.info(
                LoggerContext.SYSTEM,
                `Personagem "${character.name}" subiu ${levelUps} nivel(is).`,
                {
                    characterId: character.id,
                    previousLevel,
                    currentLevel: character.level,
                    experience: character.experience
                }
            );

        }

        Logger.debug(
            LoggerContext.SYSTEM,
            `Personagem "${character.name}" recebeu ${amount} de experiencia.`,
            {
                characterId: character.id,
                previousExperience,
                currentExperience: character.experience
            }
        );

        return {

            characterId: character.id,

            previousLevel,

            currentLevel:
                character.level,

            previousExperience,

            currentExperience:
                character.experience,

            experienceGained:
                amount,

            levelUps

        };

    }

    public async removeExperience(
        characterId: string,
        amount: number
    ): Promise<ExperienceLossResult> {

        this.validateExperienceAmount(
            amount
        );

        const character =
            await this.getCharacter(
                characterId
            );

        const previousLevel =
            character.level;

        const previousExperience =
            character.experience;

        character.experience =
            Math.max(
                0,
                character.experience - amount
            );

        character.level =
            this.calculator.getLevelFromExperience(
                character.experience
            );

        const levelDowns =
            Math.max(
                0,
                previousLevel - character.level
            );

        const experienceLost =
            previousExperience -
            character.experience;

        await this.characterRepository.save(
            character
        );

        if (levelDowns > 0) {

            Logger.warn(
                LoggerContext.SYSTEM,
                `Personagem "${character.name}" perdeu ${levelDowns} nivel(is).`,
                {
                    characterId: character.id,
                    previousLevel,
                    currentLevel: character.level,
                    previousExperience,
                    currentExperience:
                        character.experience
                }
            );

        }

        return {

            characterId: character.id,

            previousLevel,

            currentLevel:
                character.level,

            previousExperience,

            currentExperience:
                character.experience,

            experienceLost,

            levelDowns

        };

    }

    public async applyDeathPenalty(
        characterId: string,
        penalty: DeathPenalty
    ): Promise<ExperienceLossResult> {

        if (
            penalty.experienceLossPercent < 0 ||
            penalty.experienceLossPercent > 100
        ) {

            throw new Error(
                "A porcentagem de perda de experiencia deve estar entre 0 e 100."
            );

        }

        const character =
            await this.getCharacter(
                characterId
            );

        const experienceLost =
            Math.floor(
                character.experience *
                (
                    penalty.experienceLossPercent /
                    100
                )
            );

        if (experienceLost === 0) {

            return {

                characterId: character.id,

                previousLevel:
                    character.level,

                currentLevel:
                    character.level,

                previousExperience:
                    character.experience,

                currentExperience:
                    character.experience,

                experienceLost: 0,

                levelDowns: 0

            };

        }

        return this.removeExperience(
            characterId,
            experienceLost
        );

    }

    public async getProgress(
        characterId: string
    ): Promise<LevelProgress> {

        const character =
            await this.getCharacter(
                characterId
            );

        const experienceForCurrentLevel =
            this.calculator.getTotalExperienceForLevel(
                character.level
            );

        const experienceForNextLevel =
            this.calculator.getTotalExperienceForLevel(
                character.level + 1
            );

        const experienceIntoLevel =
            this.calculator.getExperienceProgress(
                character.level,
                character.experience
            );

        const experienceRequiredForLevel =
            this.calculator.getExperienceRequiredForLevel(
                character.level
            );

        return {

            level:
                character.level,

            experience:
                character.experience,

            experienceForCurrentLevel,

            experienceForNextLevel,

            experienceIntoLevel,

            experienceRequiredForLevel

        };

    }

    public getLevelCalculator(): LevelCalculator {

        return this.calculator;

    }

    private async getCharacter(
        characterId: string
    ): Promise<Character> {

        const character =
            await this.characterRepository.findById(
                characterId
            );

        if (!character) {

            throw new Error(
                `Personagem "${characterId}" não encontrado.`
            );

        }

        return character;

    }

    private validateExperienceAmount(
        amount: number
    ): void {

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            throw new Error(
                "A quantidade de experiencia deve ser maior que zero."
            );

        }

    }

}