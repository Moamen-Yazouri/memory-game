import { LevelsTypes } from "@/@types";


export const generateColumns = (level: LevelsTypes) => {
    switch(level) {
        case "easy": return 3;
        case "medium": return 4;
        case "hard": return 4;
        case "veryHard": return 6;
        case "monster": return 8; 

    }
}