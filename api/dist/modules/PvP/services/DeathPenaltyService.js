"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeathPenaltyService = void 0;
class DeathPenaltyService {
    calculate(context) {
        /**
         * Red Skull ignora AOL.
         */
        const aolProtected = context.hasAOL &&
            !context.isRedSkull;
        let experienceLost = 0;
        let levelLost = 0;
        /**
         * Perda base de XP.
         */
        if (context.isRedSkull) {
            experienceLost =
                Math.floor(context.experience * 0.10);
        }
        else if (aolProtected) {
            experienceLost =
                Math.floor(context.experience * 0.02);
        }
        else {
            experienceLost =
                Math.floor(context.experience * 0.05);
        }
        /**
         * Determina se perdeu level.
         */
        const remainingExperience = context.experience -
            experienceLost;
        if (remainingExperience <
            context.experienceForCurrentLevel) {
            levelLost = 1;
        }
        /**
         * Drop.
         */
        const itemsDropped = [];
        if (context.isRedSkull) {
            /**
             * Red Skull pode perder itens
             * independentemente do AOL.
             */
            itemsDropped.push(...context.inventory.slice(0, 3));
        }
        else if (!aolProtected) {
            itemsDropped.push(...context.inventory.slice(0, 1));
        }
        return {
            experienceLost,
            levelLost,
            itemsDropped,
            aolProtected
        };
    }
}
exports.DeathPenaltyService = DeathPenaltyService;
