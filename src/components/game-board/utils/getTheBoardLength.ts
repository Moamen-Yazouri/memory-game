import { LevelsTypes } from "@/@types";

export const getBoardLenght = (level: LevelsTypes) => {
    switch(level) {
        case "easy": return 3;
        case "medium": return 6;
        case "hard": return 8;
        case "veryHard": return 12;
        case "monster": return 16;
    }
}