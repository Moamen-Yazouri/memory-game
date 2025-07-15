import { LevelsTypes } from "@/@types";
import { Star } from "@mui/icons-material";
import { Theme } from "@mui/material";
import { JSX } from "react";

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

export const renderStars = (theme: Theme, level: Omit<LevelsTypes, "monster">): JSX.Element[] => {
    const count = getLevelStars(level);
    const stars = Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        sx={{
          fontSize: 20,
          color: i < count ? theme.palette.warning.main : theme.palette.grey[400],
          filter: i < count ? "drop-shadow(0 2px 4px rgba(255, 193, 7, 0.4))" : "none",
        }}
      />
    ))
    return stars;
}