import { Levels, LevelsTypes } from "@/@types";

export const getTheNextlevel = (level: LevelsTypes) => {
    const levels: LevelsTypes[] = Object.values(Levels);
    const currIndex = levels.indexOf(level);
    if(level === "veryHard") {
        return null;
    }
    else {
        return levels[currIndex + 1];
    }
}