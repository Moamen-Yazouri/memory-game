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
    useRef, 
    useState 
} from "react";

const GameTimer = () => {
    const {state} = useContext(GameInfoContext);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
useEffect(() => {
    if (!state.initialized) {
        return;
    }

    if (state.isGameActive) {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        timerRef.current = setInterval(() => {
            setTime(t => t + 1); 
        }, 1000);
    } else {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    return () => {
        if (timerRef.current) {
            setTime(0);
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
}, [state.isGameActive, state.initialized]);

    

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