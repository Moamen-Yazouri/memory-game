import { LevelsTypes } from "@/@types";

const getLevelStars = (level: Omit<LevelsTypes, "monster">) => {
    switch(level) {
        case "easy": {
            return 1;
        }
        case "medium": {
            return 2;
        }
        case "hard": {
            return 3;
        }
        case "veryHard": {
            return 4;
        }
        default: return 5;
    }
}