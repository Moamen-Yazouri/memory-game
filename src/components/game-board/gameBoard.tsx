import { Box, Grid } from "@mui/material";
import GameCard from "../game-card/gameCard";
import { useContext, useEffect, useMemo } from "react";
import { getResponsiveColumns } from "./utils/getTheBoardLength";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import GameHeader from "./gameheader";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import SelectionRequired from "./components/selectionRequired";
import { IFinishedLevel } from "@/@types";



const GameBoard = () => {
  const {gameInfo, gameState, gameDispatch }= useContext(GameInfoContext);
  const {playerState ,playerDispatch } = useContext(PlayerInfoContext);

  useEffect(() => {
    if(gameInfo.level !== playerState.currentInfo.level) {
      playerDispatch({type: "CHANGE_CURRENT", payload: {level: gameInfo.level!, modeName: gameInfo.mode!}})
    }
  }, [gameInfo]);
  
  useEffect(() => {
      if(gameState.isCompleted) {
        console.log("finished")
          const finishedLevel: IFinishedLevel = {
            level: gameInfo.level!,
            score: gameState.score,
            time: gameState.time,
            wrongMoves: gameState.wrongMoves,
          }
          playerDispatch({type: "ADD_FINISHED", payload:{mode: gameInfo.mode!, level: finishedLevel}})
      }  
  }, [gameState.isCompleted]);
  
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      gameDispatch({type: "CHECK_MATCHED"});
    }, 800);
    
    return () => {
      clearTimeout(timeout);
    }
  },[gameState.openCards]);
  
  // const cards = useMemo(() => {
    //   return getBoardLenght(gameInfo.level || "easy")
    // }, [gameInfo]);
  
    
  const responsiveColumns = useMemo(() => {
    return getResponsiveColumns(gameInfo.level!)
  }, [gameInfo]);

  if(!gameInfo.level || !gameInfo.mode) {
    return <SelectionRequired />;
  }

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
        {gameState.cards.map((value, index) => (
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
