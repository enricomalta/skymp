export class LevelCalculator {

    private readonly BASE_EXPERIENCE = 100;

    private readonly GROWTH_RATE = 1.15;

    public getExperienceForNextLevel(
        level: number
    ): number {

        if (level < 1) {
            throw new Error(
                "O level deve ser maior ou igual a 1."
            );
        }

        return Math.floor(
            this.BASE_EXPERIENCE *
            Math.pow(
                this.GROWTH_RATE,
                level - 1
            )
        );

    }

    public getTotalExperienceForLevel(
        level: number
    ): number {

        if (level <= 1) {
            return 0;
        }

        let totalExperience = 0;

        for (
            let currentLevel = 1;
            currentLevel < level;
            currentLevel++
        ) {

            totalExperience +=
                this.getExperienceForNextLevel(
                    currentLevel
                );

        }

        return totalExperience;

    }

    public getLevelFromExperience(
        experience: number
    ): number {

        if (experience <= 0) {
            return 1;
        }

        let level = 1;

        while (
            this.getTotalExperienceForLevel(
                level + 1
            ) <= experience
        ) {

            level++;

        }

        return level;

    }

    public getExperienceProgress(
        level: number,
        experience: number
    ): number {

        const currentLevelExperience =
            this.getTotalExperienceForLevel(
                level
            );

        return Math.max(
            0,
            experience - currentLevelExperience
        );

    }

    public getExperienceRequiredForLevel(
        level: number
    ): number {

        return this.getExperienceForNextLevel(
            level
        );

    }

    public getExperienceToNextLevel(
        level: number,
        experience: number
    ): number {

        const nextLevelExperience =
            this.getTotalExperienceForLevel(
                level + 1
            );

        return Math.max(
            0,
            nextLevelExperience - experience
        );

    }

}