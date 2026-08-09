import {
    PvPStateService
} from "./PvPStateService";

export class PvPPointService {

    constructor(
        private readonly stateService:
            PvPStateService
    ) {}

    public addPoint(
        characterId: string,
        amount: number = 1
    ): number {

        if (
            !Number.isInteger(amount) ||
            amount <= 0
        ) {

            throw new Error(
                "A quantidade de pontos PvP deve ser um inteiro maior que zero."
            );

        }

        const state =
            this.stateService.getState(
                characterId
            );

        state.pvpPoints += amount;

        return state.pvpPoints;

    }

    public getPoints(
        characterId: string
    ): number {

        return this.stateService
            .getState(characterId)
            .pvpPoints;

    }

}