import { GameModesTypes, LevelsTypes } from "@/@types"
import { Favorite, LocationOn, School, Event } from "@mui/icons-material"
import { Theme } from "@mui/material"
import { IGameLevel, IGameMode } from "./types"
export const getGameModesAndLevels = (theme: Theme) => {

  const gameModes: IGameMode[] = [
    {
      id: "education" as GameModesTypes,
      name: "Education",
      description: "Learn while you play",
      icon: <School sx={{ fontSize: 40 }} />,
      bgImage: "/placeholder.svg?height=200&width=300",
      color: theme.palette.info.main,
    },
    {
      id: "emotional" as GameModesTypes,
      name: "Emotional",
      description: "Express your feelings",
      icon: <Favorite sx={{ fontSize: 40 }} />,
      bgImage: "/placeholder.svg?height=200&width=300",
      color: theme.palette.error.main,
    },
    {
      id: "events" as GameModesTypes,
      name: "Events",
      description: "Remember special moments",
      icon: <Event sx={{ fontSize: 40 }} />,
      bgImage: "/placeholder.svg?height=200&width=300",
      color: theme.palette.warning.main,
    },
    {
      id: "states" as GameModesTypes,
      name: "States",
      description: "Geography challenge",
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      bgImage: "/placeholder.svg?height=200&width=300",
      color: theme.palette.success.main,
    },
  ]
  
    const levels: IGameLevel[] = [
      {
        id: "easy" as LevelsTypes,
        name: "Easy",
        description: "Perfect for beginners",
        cards: "4x4 Grid",
        color: theme.palette.success.main,
      },
      {
        id: "medium" as LevelsTypes,
        name: "Medium",
        description: "Moderate challenge",
        cards: "6x6 Grid",
        color: theme.palette.warning.main,
      },
      {
        id: "hard" as LevelsTypes,
        name: "Hard",
        description: "For experienced players",
        cards: "8x8 Grid",
        color: theme.palette.error.main,
      },
      {
        id: "veryHard" as LevelsTypes,
        name: "Very Hard",
        description: "Ultimate challenge",
        cards: "10x10 Grid",
        color: theme.palette.secondary.main,
      },
    ]

    return {
      gameModes,
      levels
    };
}
