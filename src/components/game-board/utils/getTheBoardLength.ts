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
      case 'easy': // 6 cards
        return { xs: 2, sm: 3, md: 3 } // 3x2, 2x3, 2x3
      case 'medium': // 12 cards
        return { xs: 3, sm: 4, md: 4 } // 4x3, 3x4, 3x4
      case 'hard': // 16 cards
        return { xs: 4, sm: 4, md: 4 } // 4x4, 4x4, 4x4
      case 'veryHard': // 24 cards
        return { xs: 4, sm: 6, md: 6 } // 6x4, 4x6, 4x6
      case 'monster': // 32 cards
        return { xs: 8, sm: 8, md: 8 } // 8x4, 6x5.33, 4x8
      default:
        return { xs: 4, sm: 6, md: 8 }
    }
  }