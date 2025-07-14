import { GameModesTypes, IGameCard, LevelsTypes } from "@/@types";
import { getBoardLenght } from "@/components/game-board/utils/getTheBoardLength";
import { getCardImage } from "@/components/game-card/service/getImage.service";


export const getGameCards = (level: LevelsTypes, mode: GameModesTypes | null) => {
    const length = getBoardLenght(level);
    const unique = Array.from({ length }, (_, i) => i + 1).map((l) => {
        return {value: l, imgUrl: getCardImage(l, mode)};
    }); 
    const gameCards: IGameCard[] =[...unique, ...unique].map((val, index) => {
            return {
                id: index,
                value: val.value,
                isFlipped: false,
                isMatched: false,
                imageUrl: val.imgUrl,
            }
    }).sort(
      () => Math.random() - 0.5,
    )
    return gameCards;
}
