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

export const getResponsiveColumns = (level: LevelsTypes) => {
    switch (level) {
      case 'easy': 
        return { xs: 2, sm: 3, md: 3 } 
      case 'medium': 
        return { xs: 3, sm: 4, md: 4 } 
      case 'hard': 
        return { xs: 4, sm: 4, md: 4 } 
      case 'veryHard': 
        return { xs: 4, sm: 6, md: 6 } 
      case 'monster': 
        return { xs: 8, sm: 8, md: 8 } 
      default:
        return { xs: 4, sm: 6, md: 8 }
    }
  }