import { LevelsTypes } from "@/@types";
import { getBoardLenght } from "@/components/game-board/utils/getTheBoardLength";

export const getAllowedWrongs = (level: LevelsTypes) => {
    const pairs = getBoardLenght(level);
    return Math.floor(pairs * 1.5);
}

export const getWrongMovesPerStar = (level: LevelsTypes): number => {
  const allowedWrongs = getAllowedWrongs(level);
  return Math.ceil(allowedWrongs / 3);
}

export const getStarsByWrongMoves = (level: LevelsTypes, wrongMoves: number): number => {
  const perStar = getWrongMovesPerStar(level);
  const lostStars = Math.floor(wrongMoves / perStar);
  return Math.max(3 - lostStars, 0);
}

