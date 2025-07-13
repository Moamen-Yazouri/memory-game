import { Levels, LevelsTypes } from "@/@types";
import { getFormatedlevel } from "./getDiplayLevel";

export const getNextLevel = (level: LevelsTypes) => {
    const levels: LevelsTypes[] = Object.values(Levels);
    const index = levels.indexOf(level);
    if(index == levels.length - 1) {
        return "Mode Completion";
    }
    else {
        return `${getFormatedlevel(levels[index + 1])} Level`;
    }
}