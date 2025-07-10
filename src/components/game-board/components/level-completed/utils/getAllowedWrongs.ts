import { LevelsTypes } from "@/@types";
import { getBoardLenght } from "@/components/game-board/utils/getTheBoardLength";

export const getAllowedWrongs = (level: LevelsTypes) => {
    const pairs = getBoardLenght(level);
    return Math.floor(pairs * 1.5);
}