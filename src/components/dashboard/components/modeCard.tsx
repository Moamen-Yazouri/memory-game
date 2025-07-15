import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { formatTime } from '../utils/formatTime';
import Chip from '@mui/material/Chip';
import { 
    getModeColor, 
    getModeDescription, 
    getModeDisplayName, 
} from '../utils/getModeDetails';
import Avatar from '@mui/material/Avatar'
import { ICompletedMode } from '../types'
import { GameThemeContext } from '@/providers/theme/themeContext'
import { getModeIcon } from '../utils/getModeIcon'
interface IProps {
    modeData: ICompletedMode
}
const ModeCard = ({modeData}: IProps) => {
    const {mode, theme} = useContext(GameThemeContext);
    const modeColor = getModeColor(modeData.mode, theme);
    const modeIcon = getModeIcon(modeData.mode);
    return (
        <Paper
                key={modeData.mode}
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundImage:
                    mode === "light"
                        ? "linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(76, 175, 80, 0.05) 100%)"
                        : "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(45, 27, 78, 0.9) 50%, rgba(76, 175, 80, 0.1) 100%)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    border: `1px solid ${modeColor}30`,
                    boxShadow: mode === "light" ? `0 4px 16px ${modeColor}10` : `0 4px 16px rgba(0, 0, 0, 0.3)`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: mode === "light" ? `0 8px 25px ${modeColor}20` : `0 8px 25px rgba(0, 0, 0, 0.4)`,
                    },
                }}
                >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        sx={{
                        bgcolor: modeColor + "15",
                        color: modeColor,
                        width: 40,
                        height: 40,
                        border: `2px solid ${modeColor}30`,
                        }}
                    >
                        {modeIcon}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={600}>{getModeDisplayName(modeData.mode)}</Typography>
                        <Typography variant="caption" color="text.secondary">
                        {getModeDescription(modeData.mode)}
                        </Typography>
                    </Box>
                    </Stack>
                    <Chip
                    label={`${modeData.levelsCompleted} Levels`}
                    size="small"
                    sx={{
                        backgroundColor: modeColor,
                        color: "#fff",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                    />
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box display="flex" gap={0.5}>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                    Avg Time: {formatTime(modeData.averageTime)}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight={600} color={modeColor}>
                    Total Score: {modeData.totalScore.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Best: {modeData.bestScore.toLocaleString()}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                    Levels Completed: {modeData.levelsCompleted}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Total Mistakes: {modeData.totalWrongMoves}
                    </Typography>
                </Stack>
        </Paper>
    )
}

export default ModeCard;