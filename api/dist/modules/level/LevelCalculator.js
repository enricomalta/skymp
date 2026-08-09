"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelCalculator = void 0;
class LevelCalculator {
    BASE_EXPERIENCE = 100;
    GROWTH_RATE = 1.15;
    getExperienceForNextLevel(level) {
        if (level < 1) {
            throw new Error("O level deve ser maior ou igual a 1.");
        }
        return Math.floor(this.BASE_EXPERIENCE *
            Math.pow(this.GROWTH_RATE, level - 1));
    }
    getTotalExperienceForLevel(level) {
        if (level <= 1) {
            return 0;
        }
        let totalExperience = 0;
        for (let currentLevel = 1; currentLevel < level; currentLevel++) {
            totalExperience +=
                this.getExperienceForNextLevel(currentLevel);
        }
        return totalExperience;
    }
    getLevelFromExperience(experience) {
        if (experience <= 0) {
            return 1;
        }
        let level = 1;
        while (this.getTotalExperienceForLevel(level + 1) <= experience) {
            level++;
        }
        return level;
    }
    getExperienceProgress(level, experience) {
        const currentLevelExperience = this.getTotalExperienceForLevel(level);
        return Math.max(0, experience - currentLevelExperience);
    }
    getExperienceRequiredForLevel(level) {
        return this.getExperienceForNextLevel(level);
    }
    getExperienceToNextLevel(level, experience) {
        const nextLevelExperience = this.getTotalExperienceForLevel(level + 1);
        return Math.max(0, nextLevelExperience - experience);
    }
}
exports.LevelCalculator = LevelCalculator;
