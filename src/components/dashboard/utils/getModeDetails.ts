import { GameModesTypes, IFinishedLevel, LevelsTypes } from "@/@types";
import { ICompletedMode } from "../types";
import { Theme } from "@mui/material";

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
    return sum / finished.length;
}

const getTotalWrongMoves = (finished: IFinishedLevel[]) => {
    return finished.reduce((curr, acc) => (curr + acc.wrongMoves), 0)
}

export const calculateModeStars = (modeData: ICompletedMode) => {
    let stars = 1; 

    if (modeData.totalWrongMoves > 50) stars++

    if (modeData.levelsCompleted >= 3) stars++

    return Math.min(stars, 3);
}

export const getModeDisplayName = (gameMode: GameModesTypes): string => {
    const modeNames = {
      education: "Education Mode",
      emotional: "Emotional Mode",
      events: "Events Mode",
      states: "States Mode",
    }
    return modeNames[gameMode];
}

export const getModeColor = (gameMode: GameModesTypes, theme: Theme) => {
    const colorMap = {
      education: theme.palette.info.main,
      emotional: theme.palette.error.main,
      events: theme.palette.warning.main,
      states: theme.palette.success.main,
    }
    return colorMap[gameMode] || theme.palette.primary.main
}

export const getModeDescription = (gameMode: GameModesTypes): string => {
    const descriptions = {
      education: "Educational type Cards",
      emotional: "Feelings type Cards",
      events: "Special moments type Cards",
      states: "Geography type Cards",
    }
    return descriptions[gameMode] || "Game mode";
  }

export const getLevelDescription = (level: LevelsTypes) => {
    const description = {
        easy: "Grid 3×2 of cards",
        medium: "Grid 6×2 of cards",
        hard: "8×2 of cards",
        veryHard: "12×2 of cards",
        monster: "16×2 of cards",
    }
    return description[level];
}