import { GameModesTypes, IFinishedLevel } from "@/@types";
import { IDashboardFinished } from "../types";

export const getFinsished = (finished: Map<GameModesTypes, IFinishedLevel[]>): IDashboardFinished[] => {
    const finishedForDashboard: IDashboardFinished[] = [];
    for(const [key, value] of finished.entries()) {
        value.map((l) => finishedForDashboard.push({...l, mode: key}))
    }
    return finishedForDashboard;
}

export const getFinishedNumber = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    let counter = 0;
    const finishedLevels = finished.values();
    for(const levels of finishedLevels) {
        if(levels.length === 4) {
            counter += 1
        }
    }
    return counter;
}

export const getFinishedLevelsNumber = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    const finishedLevels = [...finished.values()];
    const number = finishedLevels.length;
    return number;
}