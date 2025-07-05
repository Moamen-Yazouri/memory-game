"use client"

import { Box, Grid } from "@mui/material"
import GameCard from "../game-card/gameCard"
import { useContext, useEffect, useMemo } from "react"
import { getBoardLenght, getResponsiveColumns } from "./utils/getTheBoardLength"
import { GameInfoContext } from "@/providers/game-info/gameInfo"
import GameHeader from "./gameheader"



const GameBoard = () => {
  const {gameInfo, state, changeLevel, changeMode, dispatch }= useContext(GameInfoContext);

  useEffect(() => {
      changeLevel("easy");
      changeMode("education");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({type: "CHECK_MATCHED"});
    }, 800);
    
    return () => {
      clearTimeout(timeout);
    }
  },[state.openCards]);

  const cards = useMemo(() => {
    return getBoardLenght(gameInfo.level || "easy")
  }, [gameInfo]);
  

  const responsiveColumns = useMemo(() => {
    return getResponsiveColumns(gameInfo.level || "easy")
  }, [gameInfo]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        padding: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <GameHeader />
        </Box>
      <Grid
        container
        spacing={1}
        columnGap={1} // Responsive spacing
        columns={responsiveColumns}
        sx={{
          width: "100%",
          maxWidth: { xs: "60vw", sm: "60vw", md: "60vw", lg: "600px" }, // Responsive max width
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
              id={value.id}
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
