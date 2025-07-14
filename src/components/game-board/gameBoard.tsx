import { Box, Grid } from "@mui/material";
import GameCard from "../game-card/gameCard";
import { 
  useContext, 
  useEffect, 
  useMemo, 
} from "react";
import { getResponsiveColumns } from "./utils/getTheBoardLength";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import GameHeader from "./components/game-header/gameheader";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import SelectionRequired from "./components/selectionRequired";
import { IFinishedLevel } from "@/@types";
import LevelCompleted from "./components/level-completed/levelCompleted";
import { getAllowedWrongs } from "./components/level-completed/utils/getAllowedWrongs";
import GameOverModal from "./components/game-over/gameOver";
import { getCardImage } from "../game-card/service/getImage.service";
import GameLoader from "../loader/loader";

const GameBoard = () => {
  const {gameInfo, gameState, gameDispatch }= useContext(GameInfoContext);
  const {playerState ,playerDispatch } = useContext(PlayerInfoContext);
  const allowedWrongs = useMemo(() => getAllowedWrongs(gameInfo.level!), [gameInfo.level]);
  const handleRetry = () => {
    gameDispatch({type: "RESTART_GAME", payload: {level: gameInfo.level!, mode: gameInfo.mode || null}});
  }

  const handleOnMainMenu = () => {
    gameDispatch({type: "RESET_GAME"});
  }

  useEffect(() => {
      if(gameInfo.level && gameInfo.mode) {
        gameDispatch({type: "INITIAL_GAME", payload: {level: gameInfo.level, mode: gameInfo.mode}})
      }
  }, [gameInfo.level, gameInfo.mode]);
  useEffect(() => {
    if(gameInfo.level !== playerState.currentInfo.level) {
      playerDispatch({type: "CHANGE_CURRENT", payload: {level: gameInfo.level!, modeName: gameInfo.mode!}})
    }
  }, [gameInfo]);
  
  useEffect(() => {
      
      if(gameState.isCompleted) {
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
  
  useEffect(() => {
    if(gameState.wrongMoves == allowedWrongs) {

        gameDispatch({type: "GAME_OVER"});
    }
  }, [gameState.wrongMoves]);
  
    
  const responsiveColumns = useMemo(() => {
    return getResponsiveColumns(gameInfo.level!)
  }, [gameInfo]);

  if((!gameInfo.level || !gameInfo.mode) && (!playerState.currentInfo.level && !playerState.currentInfo.modeName)) {
    return <SelectionRequired />;
  }

  if(gameState.cards.length == 0) {
        return (
            <GameLoader />
        )
  }

  if(gameState.isCompleted && gameInfo.level !== "monster") {
    return <LevelCompleted
      level={ gameInfo.level!}
      mode={gameInfo.mode!}
      score={gameState.score}
      time={gameState.time.toString()}
      wrongMoves={gameState.wrongMoves}
      onRetry= {handleRetry}
      isNewRecord= {false}
    />
  }

  return (
    <>
      <GameOverModal
        open={gameState.isOver}
        level= {gameInfo.level!}
        score={gameState.score}
        timeElapsed={gameState.time}
        mode= {gameInfo.mode!}
        wrongMoves={gameState.wrongMoves}
        onRetry={handleRetry}
        onMainMenu={handleOnMainMenu}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "100vh",
          padding: { xs: 1, sm: 2, md: 3 }, 
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <GameHeader />
          </Box>
        <Grid
          container
          spacing={1}
          columnGap={1} 
          columns={responsiveColumns}
          sx={{
            width: "100%",
            maxWidth: { xs: "60vw", sm: "60vw", md: "60vw", lg: "600px" }, 
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
                aspectRatio: "1", 
              }}
            >
              <GameCard
                imageUrl={getCardImage(value.value, gameInfo.mode)}
                id={value.id}
                value={value.value} 
                isFlipped= {value.isFlipped}
                isMatched={value.isMatched}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default GameBoard;
