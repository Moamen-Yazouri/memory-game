import { IGameCard, LevelsTypes } from "@/@types";
import { getBoardLenght } from "@/components/game-board/utils/getTheBoardLength";

export const getGameCards = (level: LevelsTypes) => {
    const length = getBoardLenght(level);
    const unique = Array.from({ length }, (_, i) => i + 1); 
    const gameCards: IGameCard[] =[...unique, ...unique].map((val, index) => {
            return {
                id: index,
                value: val,
                isFlipped: false,
                isMatched: false,
            }
    }).sort(
      () => Math.random() - 0.5,
    )
    return gameCards;
}