import { GameModesTypes, IFinishedLevel, Levels } from "@/@types";
import { ICompletedMode } from "../types";

export const getModeDetails = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    const completedDetails: ICompletedMode[] = [];
    for(const [key, value] of finished.entries()) {
        
            const completed: ICompletedMode = {
                mode: key,
                totalScore: getTotalScore(value),
                levelsCompleted: value.length,
                averageTime: getAverageTime(value),
                totalWrongMoves: getTotalWrongMoves(value),
                bestScore: getBestScore(value),
            }
            completedDetails.push(completed)
    }
    return completedDetails;
}

const getTotalScore = (finished: IFinishedLevel[]) => {
    let counter = 0;
    finished.map((f) => {
        counter += f.score;
    });
    return counter;

}

const getBestScore = (finished: IFinishedLevel[]) => {
    
    const bestScore = finished.reduce((curr, acc) => {
        if(acc.score > curr) {
            return acc.score;
        }
        else {
            return curr;
        }
    }, 0);
    return bestScore;
}

const getAverageTime = (finished: IFinishedLevel[]) => {
    const sum = finished.reduce((curr, acc) => (curr + acc.time),0);
    return Number((sum/finished.length).toFixed(2));
}

const getTotalWrongMoves = (finished: IFinishedLevel[]) => {
    return finished.reduce((curr, acc) => (curr + acc.wrongMoves), 0)
}

export const calculateModeStars = (modeData: ICompletedMode) => {
    let stars = 1; 

    if (modeData.totalScore > 50) stars++

    if (modeData.levelsCompleted >= 3) stars++

    return Math.min(stars, 3)
}