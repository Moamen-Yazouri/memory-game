import { IFinishedLevel, LevelsTypes } from "@/@types";
import { getAllowedWrongs } from "@/components/game-board/components/level-completed/utils/getAllowedWrongs";

export const getLevelDetails = (level: LevelsTypes, finished: IFinishedLevel[]) => {
    const selectedLevel = finished.find((f) => (level === f.level));
    
        const details = {
            time: selectedLevel!.time,
            wrongMoves: selectedLevel!.wrongMoves,
            score: selectedLevel!.score,
            starsNumber: getStarsByWrongMoves(level ,selectedLevel!.wrongMoves),
        }
        return details;
    
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
