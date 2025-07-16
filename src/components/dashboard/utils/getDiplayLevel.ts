import { Levels, LevelsTypes } from "@/@types";

export const getFormatedlevel = (level: LevelsTypes) => {
    return level.split("").map((l, i) => i == 0 ? l.toUpperCase() : l).join("");
}

export const getLevelPercentage = (level: LevelsTypes) => {
    const levels: LevelsTypes[] = Object.values(Levels);
    const number = level === "easy" ? levels.indexOf(level)  : levels.indexOf(level) + 1;
    const percentage = (((number) / levels.length) * 100);
    return percentage;
} 