export interface ExperienceResult {

    characterId: string;

    previousLevel: number;

    currentLevel: number;

    previousExperience: number;

    currentExperience: number;

    experienceGained: number;

    levelUps: number;

}

export interface ExperienceLossResult {

    characterId: string;

    previousLevel: number;

    currentLevel: number;

    previousExperience: number;

    currentExperience: number;

    experienceLost: number;

    levelDowns: number;

}

export interface DeathPenalty {

    experienceLossPercent: number;

}

export interface LevelProgress {

    level: number;

    experience: number;

    experienceForCurrentLevel: number;

    experienceForNextLevel: number;

    experienceIntoLevel: number;

    experienceRequiredForLevel: number;

}