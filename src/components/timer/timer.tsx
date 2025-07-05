import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { Timer } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react"

const GameTimer = () => {
    const {state} = useContext(GameInfoContext);
    const [time, setTime] = useState(0);
    useEffect(() => {
        if(!state.initialized) {
            return;
        }
        let timerInterval: NodeJS.Timeout;
        if(state.isGameActive) {
            timerInterval = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
        }
        else if(!state.isGameActive && time > 0) {
            setTime(0);
        }
        return () => clearInterval(timerInterval);
    }, [state.isGameActive]);

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
            {formatTime(time)}
        </Typography>
    </Box>
  )
}

export default GameTimer;