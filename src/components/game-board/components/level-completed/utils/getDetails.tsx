import { GameModesTypes, LevelsTypes } from "@/@types";
import { Theme } from "@mui/material";
import { ILevelDetails, IModeDetails } from "../types";
import { Favorite, School, Event, LocationOn } from "@mui/icons-material";


export const getDetails = (theme: Theme) => {

    const modeDetails: Record<GameModesTypes, IModeDetails> = { 
            "education": {
                icon: <School sx={{ fontSize: 20 }} />,
                color: theme.palette.info.main,
                gradient: `linear-gradient(135deg, ${theme.palette.info.main}20, ${theme.palette.info.light}15)`,
                description: "Learning Challenge",
            },
            "emotional": {
                icon: <Favorite sx={{ fontSize: 20 }} />,
                color: theme.palette.error.main,
                gradient: `linear-gradient(135deg, ${theme.palette.error.main}20, ${theme.palette.error.light}15)`,
                description: "Emotional Intelligence",
            },
            "events": {
                icon: <Event sx={{ fontSize: 20 }} />,
                color: theme.palette.warning.main,
                gradient: `linear-gradient(135deg, ${theme.palette.warning.main}20, ${theme.palette.warning.light}15)`,
                description: "Memory Events",
            },
            "states": {
                icon: <LocationOn sx={{ fontSize: 20 }} />,
                color: theme.palette.success.main,
                gradient: `linear-gradient(135deg, ${theme.palette.success.main}20, ${theme.palette.success.light}15)`,
                description: "Geography Challenge",
            },
        }

        const levelDetails: Record<Exclude<LevelsTypes, "monster">, ILevelDetails> = {
            "easy": {
                color: theme.palette.success.main,
                gradient: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                grid: "4×4",
                difficulty: "Beginner",
            },
            "medium": {
                color: theme.palette.warning.main,
                gradient: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
                grid: "6×6",
                difficulty: "Intermediate",
            },
            "hard": {
                color: theme.palette.error.main,
                gradient: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
                grid: "8×8",
                difficulty: "Advanced",
            },
            "veryHard": {
                color: theme.palette.secondary.main,
                gradient: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                grid: "10×10",
                difficulty: "Expert",
            },
        }

        return {
            modeDetails,
            levelDetails,
        }
  }

