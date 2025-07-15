import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { Timer } from "@mui/icons-material";
import { 
    Box, 
    Typography 
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { 
    useContext, 
    useEffect, 
    useMemo, 
    useRef,  
} from "react";

const GameTimer = () => {
    const {gameState, gameDispatch} = useContext(GameInfoContext);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const restarted: boolean = useMemo(() => {
        if(!gameState.isCompleted && !gameState.isGameActive && timerRef.current && !gameState.isOver) {
            return true;
        };
        return false;
    }, [gameState.isCompleted, gameState.isGameActive, gameState.isOver]); 

    useEffect(() => {
        
        if (!gameState.initialized) {
            return;
        }

        if(restarted) {
            gameDispatch({type: "HANDLE_TIME", payload: -(gameState.time)})
        }
        
        if (gameState.isGameActive) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            
            timerRef.current = setInterval(() => {
                gameDispatch({type: "HANDLE_TIME", payload: 1}) 
            }, 1000);
        } 
        else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [gameState.isGameActive, gameState.initialized, gameState.isCompleted]);

    

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return (
    <Box sx={{ textAlign: "center", minWidth: 60 }}>
        <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
            <Timer color="primary" fontSize="small" />
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                Time
            </Typography>
        </Stack>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
            {formatTime(gameState.time)}
        </Typography>
    </Box>
  )
}

export default GameTimer;