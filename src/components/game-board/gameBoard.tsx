"use client"

import { Box, Grid } from "@mui/material"
import GameCard from "../game-card/gameCard"
import { useContext, useEffect, useMemo } from "react"
import { getBoardLenght, getResponsiveColumns } from "./utils/getTheBoardLength"
import { GameInfoContext } from "@/providers/game-info/gameInfo"



const GameBoard = () => {
  const {gameInfo, state, changeLevel, changeMode }= useContext(GameInfoContext);
  
  useEffect(() => {
  
      changeLevel("hard");

      changeMode("education")
  }, []);

  const cards = useMemo(() => {
    return getBoardLenght(gameInfo.level || "easy")
  }, [gameInfo])
  

  const responsiveColumns = useMemo(() => {
    return getResponsiveColumns(gameInfo.level || "easy")
  }, [gameInfo])

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
        {state.cards.map((value, index) => (
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
            <GameCard
              id={index}
              value={value.value} 
              isFlipped= {value.isFlipped}
              isMatched={value.isMatched}
             />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default GameBoard
