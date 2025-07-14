import { Box, Grid } from "@mui/material";
import GameCard from "../game-card/gameCard";
import { 
  useContext, 
  useEffect, 
  useMemo, 
} from "react";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import { getAllowedWrongs } from "../game-board/components/level-completed/utils/getAllowedWrongs";
import SelectionRequired from "../game-board/components/selectionRequired";
import GameOverModal from "../game-board/components/game-over/gameOver";
import { getResponsiveColumns } from "../game-board/utils/getTheBoardLength";
import GameHeader from "../game-board/components/game-header/gameheader";
import GameLoader from "../loader/loader";

const MonsterGame = () => {
  const {gameInfo, gameState, gameDispatch }= useContext(GameInfoContext);
  const {playerState, playerDispatch } = useContext(PlayerInfoContext);
  const allowedWrongs = useMemo(() => getAllowedWrongs(gameInfo.level!), [gameInfo.level]);
  

  useEffect(() => {
    gameDispatch({type: "INITIAL_GAME", payload: {level: "monster", mode: null}});
  }, []);
  const handleRetry = () => {
    gameDispatch({type: "RESTART_GAME", payload: {level: "monster", mode: null}});
  }

  const handleOnMainMenu = () => {
    gameDispatch({type: "RESET_GAME"});
  }

  useEffect(() => {
      
      if(gameState.isCompleted) {
          playerDispatch({type: "FINISH_MONSTER", payload: {
              unlocked: true,
              score: gameState.score,
            wrongMoves: gameState.wrongMoves,
            time: gameState.time,
        }})
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
    return getResponsiveColumns("monster")
}, [gameInfo]);
    if(gameState.cards.length == 0) {
        return (
            <GameLoader />
        )
    }

  if((!gameInfo.level || !gameInfo.mode) && (!playerState.currentInfo.level && !playerState.currentInfo.modeName)) {
    return <SelectionRequired />;
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
          overflow: "hidden"
        }}
      >
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
            <GameHeader />
          </Box>
        <Grid
          container
          spacing={1}
          columnGap={1} 
          columns={responsiveColumns}
          sx={{
            width: "100%",
            maxWidth: { xs: "90vw", sm: "90vw", md: "90vw", lg: "900px" }, 
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
                id={value.id}
                imageUrl={value.imageUrl}
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

export default MonsterGame;
