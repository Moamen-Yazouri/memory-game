import { GameModesTypes, IGameCard, LevelsTypes } from "@/@types";
import { getBoardLenght } from "@/components/game-board/utils/getTheBoardLength";

export const getGameCards = (level: LevelsTypes) => {
    const length = getBoardLenght(level);
    const gameCards: IGameCard[] = Array.from({ length: length * 2 }, (_, index) => 
        {
            const value = index % 2 === 0 ? index + 1 : index + 2;
            return {
                value: value,
                isFlipped: false,
                isMatched: false,
            }

        } 
    ).sort(
      () => Math.random() - 0.5,
    )
    return gameCards;
}