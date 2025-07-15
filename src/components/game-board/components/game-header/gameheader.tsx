
import type React from "react"

import { Box,
  Typography,
  IconButton, 
  Paper, 
  Chip, 
  Stack, 
  Divider, 
  useTheme 
} from "@mui/material";
import { 
  RestartAlt, 
  EmojiEvents, 
  Close, 
  Star, 
  Home, 
  Psychology, 
  Whatshot 
} from "@mui/icons-material";
import { useContext } from "react"
import { GameInfoContext } from "@/providers/game-info/gameInfo"
import GameTimer from "./timer"
import { useNavigate } from "react-router-dom"

const GameHeader = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { gameInfo, gameState, gameDispatch } = useContext(GameInfoContext)

  const isMonsterLevel = gameInfo.level === "monster"

  const handleRestart = () => {
    gameDispatch({ type: "RESTART_GAME", payload: { level: gameInfo.level!, mode: gameInfo.mode } })
  }

  const handleBackToMenu = () => {
    navigate("/memory-game/mode-selection")
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
      case "monster":
        return "error"
      default:
        return "primary"
    }
  }

  const monsterColor = "#FF4500"
  const glowColor = "rgba(255, 69, 0, 0.6)"

  const glassStyle = isMonsterLevel
    ? // Monster level glass style
      theme.palette.mode === "dark"
      ? {
          background: `
              linear-gradient(135deg, 
                rgba(139, 69, 19, 0.4) 0%,
                rgba(255, 140, 0, 0.3) 25%,
                rgba(255, 69, 0, 0.35) 50%,
                rgba(220, 20, 60, 0.3) 75%,
                rgba(139, 69, 19, 0.4) 100%
              )`,
          backdropFilter: "blur(25px) saturate(200%)",
          border: `2px solid ${monsterColor}`,
          boxShadow: `
              0 0 30px ${glowColor},
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px ${monsterColor}40
            `,
          animation: "monsterGlow 3s ease-in-out infinite alternate",
          "@keyframes monsterGlow": {
            "0%": {
              boxShadow: `0 0 30px ${glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4)`,
            },
            "100%": {
              boxShadow: `0 0 50px ${glowColor}, 0 12px 40px rgba(0, 0, 0, 0.6)`,
            },
          },
        }
      : {
          background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.6) 0%,
                rgba(255, 240, 230, 0.7) 25%,
                rgba(255, 69, 0, 0.15) 50%,
                rgba(220, 20, 60, 0.1) 75%,
                rgba(255, 255, 255, 0.6) 100%
              )`,
          backdropFilter: "blur(25px) saturate(200%)",
          border: `2px solid ${monsterColor}`,
          boxShadow: `
              0 0 30px ${glowColor},
              0 8px 32px rgba(255, 69, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              0 0 0 1px ${monsterColor}40
            `,
          animation: "monsterGlow 3s ease-in-out infinite alternate",
        }
    : // Regular glass style
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
          background: isMonsterLevel
            ? theme.palette.mode === "dark"
              ? "linear-gradient(45deg, rgba(255, 69, 0, 0.1), rgba(255, 140, 0, 0.05))"
              : "linear-gradient(45deg, rgba(255, 69, 0, 0.05), rgba(255, 140, 0, 0.03))"
            : theme.palette.mode === "dark"
              ? "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.03))"
              : "linear-gradient(45deg, rgba(139, 92, 246, 0.03), rgba(6, 182, 212, 0.02))",
          pointerEvents: "none",
        },
        
        ...(isMonsterLevel && {
          "&::after": {
            content: '""',
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "20px",
            height: "25px",
            background: "linear-gradient(45deg, #FF4500, #FFD700, #FF6347)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            opacity: 0.6,
            filter: "blur(1px)",
            animation: "flicker 2s ease-in-out infinite alternate",
            "@keyframes flicker": {
              "0%": { opacity: 0.4, transform: "scale(1) rotate(-2deg)" },
              "50%": { opacity: 0.8, transform: "scale(1.1) rotate(1deg)" },
              "100%": { opacity: 0.6, transform: "scale(1.05) rotate(-1deg)" },
            },
          },
        }),
      }}
    >
      
      {isMonsterLevel && (
        <>
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              left: "8%",
              width: "15px",
              height: "20px",
              background: "linear-gradient(45deg, #FF6347, #FF4500, #FFD700)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.5,
              filter: "blur(1px)",
              animation: "flicker 1.8s ease-in-out infinite alternate-reverse",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              opacity: 0.3,
              filter: "blur(15px)",
              animation: "pulse 4s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.2, transform: "translate(-50%, -50%) scale(1)" },
                "50%": { opacity: 0.4, transform: "translate(-50%, -50%) scale(1.1)" },
              },
            }}
          />
        </>
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", zIndex: 2 }}
      >

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={handleBackToMenu}
            sx={{
              bgcolor: isMonsterLevel
                ? `${monsterColor}20`
                : theme.palette.mode === "dark"
                  ? "rgba(139, 92, 246, 0.2)"
                  : "rgba(139, 92, 246, 0.1)",
              color: isMonsterLevel ? monsterColor : theme.palette.primary.main,
              border: `1px solid ${isMonsterLevel ? monsterColor : theme.palette.primary.main}40`,
              "&:hover": {
                bgcolor: isMonsterLevel
                  ? `${monsterColor}30`
                  : theme.palette.mode === "dark"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(139, 92, 246, 0.2)",
                transform: "scale(1.05)",
                boxShadow: isMonsterLevel
                  ? `0 4px 12px ${monsterColor}40`
                  : `0 4px 12px ${theme.palette.primary.main}40`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <Home fontSize="small" />
          </IconButton>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  background: isMonsterLevel
                    ? `linear-gradient(135deg, ${monsterColor}, #FFD700, ${monsterColor})`
                    : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: isMonsterLevel
                    ? "0 0 20px rgba(255, 69, 0, 0.5)"
                    : theme.palette.mode === "dark"
                      ? "0 0 20px rgba(139, 92, 246, 0.3)"
                      : "none",
                  animation: isMonsterLevel ? "shimmer 2s ease-in-out infinite alternate" : "none",
                  "@keyframes shimmer": {
                    "0%": { filter: "hue-rotate(0deg)" },
                    "100%": { filter: "hue-rotate(15deg)" },
                  },
                }}
              >
                Memory Game
              </Typography>
              {isMonsterLevel && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Psychology sx={{ color: monsterColor, fontSize: 20 }} />
                  <Whatshot
                    sx={{
                      color: "#FFD700",
                      fontSize: 16,
                      animation: "flicker 1.5s ease-in-out infinite alternate",
                    }}
                  />
                </Box>
              )}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip
                label={isMonsterLevel ? "MONSTER" : gameInfo.level?.toUpperCase() || "EASY"}
                color={getLevelColor()}
                size="small"
                sx={{
                  fontWeight: "bold",
                  boxShadow: isMonsterLevel
                    ? `0 4px 16px ${monsterColor}60`
                    : `0 2px 8px ${theme.palette[getLevelColor()].main}40`,
                  ...(isMonsterLevel && {
                    background: `linear-gradient(135deg, ${monsterColor}, #FFD700)`,
                    color: "white",
                    border: `2px solid #FFD700`,
                    animation: "glow 2s ease-in-out infinite alternate",
                    "@keyframes glow": {
                      "0%": { boxShadow: `0 4px 16px ${monsterColor}60` },
                      "100%": { boxShadow: `0 6px 24px ${monsterColor}80` },
                    },
                  }),
                }}
              />
              {gameInfo.level !== "monster" && (
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
              )}
            </Stack>
          </Box>
        </Stack>

        
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: isMonsterLevel
                  ? `${monsterColor}40`
                  : theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(139, 92, 246, 0.2)",
              }}
            />
          }
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 0 },
            bgcolor: isMonsterLevel
              ? theme.palette.mode === "dark"
                ? `${monsterColor}15`
                : `${monsterColor}10`
              : theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.3)",
            borderRadius: 3,
            p: 1.5,
            border: `1px solid ${
              isMonsterLevel
                ? `${monsterColor}40`
                : theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(139, 92, 246, 0.2)"
            }`,
            ...(isMonsterLevel && {
              boxShadow: `0 4px 16px ${monsterColor}20`,
            }),
          }}
        >
          <StatBox
            icon={<Star sx={{ color: getScoreColor() }} fontSize="small" />}
            label="Score"
            value={gameState.score}
            color="warning"
          />
          <StatBox
            icon={<Close color="error" fontSize="small" />}
            label="Wrong"
            value={gameState.wrongMoves}
            color="error"
          />
          <GameTimer />
        </Stack>

        
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={handleRestart}
            sx={{
              bgcolor: isMonsterLevel ? monsterColor : theme.palette.primary.main,
              color: "white",
              boxShadow: isMonsterLevel ? `0 6px 20px ${monsterColor}50` : `0 4px 12px ${theme.palette.primary.main}40`,
              "&:hover": {
                bgcolor: isMonsterLevel ? theme.palette.error.dark : theme.palette.primary.dark,
                transform: "scale(1.05)",
                boxShadow: isMonsterLevel
                  ? `0 8px 25px ${monsterColor}70`
                  : `0 6px 20px ${theme.palette.primary.main}60`,
              },
              transition: "all 0.3s ease",
              ...(isMonsterLevel && {
                border: `2px solid #FFD700`,
                animation: "buttonGlow 3s ease-in-out infinite alternate",
                "@keyframes buttonGlow": {
                  "0%": { boxShadow: `0 6px 20px ${monsterColor}50` },
                  "100%": { boxShadow: `0 8px 25px ${monsterColor}70` },
                },
              }),
            }}
          >
            <RestartAlt />
          </IconButton>
          {gameState.isCompleted && (
            <Chip
              icon={<EmojiEvents />}
              label={isMonsterLevel ? "MONSTER CONQUERED!" : "Complete!"}
              color="success"
              sx={{
                fontWeight: "bold",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                  "100%": { transform: "scale(1)" },
                },
                ...(isMonsterLevel && {
                  background: `linear-gradient(135deg, ${monsterColor}, #FFD700)`,
                  color: "white",
                  border: `2px solid #FFD700`,
                  boxShadow: `0 4px 16px ${monsterColor}50`,
                }),
              }}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default GameHeader
