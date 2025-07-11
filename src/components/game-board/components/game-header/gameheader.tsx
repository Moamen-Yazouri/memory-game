import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material"
import {
  RestartAlt,
  EmojiEvents,
  Close,
  Star,
  Home,
} from "@mui/icons-material"
import { useContext } from "react"
import { GameInfoContext } from "@/providers/game-info/gameInfo"
import GameTimer from "./timer"
import { useNavigate } from "react-router-dom"

const GameHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { gameInfo, gameState, gameDispatch } = useContext(GameInfoContext)

  const handleRestart = () => {
    gameDispatch({ type: "RESTART_GAME", payload: gameInfo.level! })
  }

  const handleBackToMenu = () => {
      navigate("/memory-game/mode-selection");
  }

  const getScoreColor = () => {
    if (gameState.wrongMoves === 0) return "success"
    if (gameState.wrongMoves <= 3) return "warning"
    return "error"
  }

  const getLevelColor = () => {
    switch (gameInfo.level) {
      case "easy":
        return "success"
      case "medium":
        return "warning"
      case "hard":
        return "error"
      default:
        return "primary"
    }
  }

  const glassStyle =
    theme.palette.mode === "dark"
      ? {
          background: `
            linear-gradient(135deg, 
              rgba(45, 27, 78, 0.25) 0%, 
              rgba(26, 15, 46, 0.35) 25%,
              rgba(139, 92, 246, 0.15) 50%,
              rgba(6, 182, 212, 0.1) 75%,
              rgba(45, 27, 78, 0.25) 100%
            )`,
          backdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(139, 92, 246, 0.2)`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(139, 92, 246, 0.1)
          `,
        }
      : {
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.4) 0%, 
              rgba(250, 247, 255, 0.6) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              rgba(6, 182, 212, 0.08) 75%,
              rgba(255, 255, 255, 0.4) 100%
            )`,
          backdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(255, 255, 255, 0.3)`,
          boxShadow: `
            0 8px 32px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 0 1px rgba(139, 92, 246, 0.1)
          `,
        }

  const StatBox = ({
    icon,
    label,
    value,
    color,
  }: {
    icon: React.ReactNode
    label: string
    value: number
    color: string
  }) => (
    <Box sx={{ textAlign: "center", minWidth: 60 }}>
      <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
        {icon}
        <Typography variant="body2" color="text.secondary" fontWeight="medium">
          {label}
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight="bold" color={`${color}.main`}>
        {value}
      </Typography>
    </Box>
  )

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        ...glassStyle,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.03))"
              : "linear-gradient(45deg, rgba(139, 92, 246, 0.03), rgba(6, 182, 212, 0.02))",
          pointerEvents: "none",
        },
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="center">
        {/* Left Section */}
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={handleBackToMenu}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.1)",
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}40`,
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.2)",
                transform: "scale(1.05)",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <Home fontSize="small" />
          </IconButton>

          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: theme.palette.mode === "dark" ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none",
              }}
            >
              Memory Game
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={gameInfo.level?.toUpperCase() || "EASY"}
                color={getLevelColor()}
                size="small"
                sx={{ fontWeight: "bold", boxShadow: `0 2px 8px ${theme.palette[getLevelColor()].main}40` }}
              />
              <Chip
                label={gameInfo.mode?.toUpperCase() || "EDUCATION"}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              />
            </Stack>
          </Box>
        </Stack>

        {/* Center Stats */}
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(139, 92, 246, 0.2)",
              }}
            />
          }
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 0 },
            bgcolor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)",
            borderRadius: 3,
            p: 1.5,
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(139, 92, 246, 0.2)"
            }`,
          }}
        >
          <StatBox icon={<Star sx={{ color: getScoreColor() }} fontSize="small" />} label="Score" value={gameState.score} color="warning" />
          <StatBox icon={<Close color="error" fontSize="small" />} label="Wrong" value={gameState.wrongMoves} color="error" />
          <GameTimer />
        </Stack>

        {/* Right Controls */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={handleRestart}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
                transform: "scale(1.05)",
                boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <RestartAlt />
          </IconButton>
          {gameState.isCompleted && (
            <Chip
              icon={<EmojiEvents />}
              label="Complete!"
              color="success"
              sx={{
                fontWeight: "bold",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default GameHeader;
