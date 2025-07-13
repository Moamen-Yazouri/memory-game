import { GameModesTypes, IFinishedLevel } from "@/@types";

export const getTopScore = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    const topScore = [...finished.values()].reduce((total, level) => (
        total + level.reduce((curr, acc) => curr + acc.score, 0)
    ), 0);
    return topScore;
} 