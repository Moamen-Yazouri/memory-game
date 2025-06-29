"use client"

import { Box, Grid } from "@mui/material"
import GameCard from "../game-card/gameCard"
import { useMemo } from "react"
import type { LevelsTypes } from "@/@types"
import { getBoardLenght } from "./utils/getTheBoardLength"

interface IProps {
  level: LevelsTypes
}

const GameBoard = (props: IProps) => {
  const cards = useMemo(() => {
    return getBoardLenght(props.level)
  }, [props.level])

  const array: number[] = useMemo(() => {
    return Array.from({ length: cards * 2 }, (_, index) => (index % 2 === 0 ? index + 1 : index + 2)).sort(
      () => Math.random() - 0.5,
    )
  }, [cards])

  // Responsive columns based on level and screen size
  const getResponsiveColumns = (level: LevelsTypes) => {
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
        return { xs: 4, sm: 6, md: 8 } // 8x4, 6x5.33, 4x8
      default:
        return { xs: 2, sm: 3, md: 4 }
    }
  }

  const responsiveColumns = useMemo(() => {
    return getResponsiveColumns(props.level)
  }, [props.level])

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 1.5, md: 2 }} // Responsive spacing
        columns={responsiveColumns}
        sx={{
          width: "100%",
          maxWidth: { xs: "100vw", sm: "90vw", md: "80vw", lg: "600px" }, // Responsive max width
        }}
      >
        {array.map((value, index) => (
          <Grid
            key={index}
            size={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1", // Keep cards square
            }}
          >
            <GameCard value={value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default GameBoard
