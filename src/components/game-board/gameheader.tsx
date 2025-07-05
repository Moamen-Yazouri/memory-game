"use client"

import { Box, Typography, IconButton, Paper, Chip, Stack, Divider, useTheme } from "@mui/material"
import { RestartAlt, EmojiEvents, Close, Timer, Star, Home } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import { GameInfoContext } from "@/providers/game-info/gameInfo"
import GameTimer from "../timer/timer"

interface GameHeaderProps {
  onBackToMenu?: () => void
}

const GameHeader = ({ onBackToMenu }: GameHeaderProps) => {
  const theme = useTheme()
  const { gameInfo, state, dispatch } = useContext(GameInfoContext)
  


  // Timer logic

  // Start timer when first card is flipped
  

  // Stop timer when game is complete
  

  const handleRestart = () => {
    dispatch({ type: "RESTART_GAME", pyload: gameInfo.level! });
  }

  const handleBackToMenu = () => {
    if (onBackToMenu) {
      onBackToMenu()
    }
  }

  

  const getScoreColor = () => {
    if (state.wrongMoves === 0) return "success"
    if (state.wrongMoves <= 3) return "warning"
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

  // Glass morphism background based on theme mode
  const glassBackground =
    theme.palette.mode === "dark"
      ? {
          background: `
          linear-gradient(135deg, 
            rgba(45, 27, 78, 0.25) 0%, 
            rgba(26, 15, 46, 0.35) 25%,
            rgba(139, 92, 246, 0.15) 50%,
            rgba(6, 182, 212, 0.1) 75%,
            rgba(45, 27, 78, 0.25) 100%
          )
        `,
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
          )
        `,
          backdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(255, 255, 255, 0.3)`,
          boxShadow: `
          0 8px 32px rgba(139, 92, 246, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          0 0 0 1px rgba(139, 92, 246, 0.1)
        `,
        }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        ...glassBackground,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)"
              : "linear-gradient(45deg, rgba(139, 92, 246, 0.03) 0%, rgba(6, 182, 212, 0.02) 100%)",
          pointerEvents: "none",
        },
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between">
        {/* Back Button & Game Title */}
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
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Home fontSize="small" />
          </IconButton>

          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: theme.palette.mode === "dark" ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none",
              }}
            >
              Memory Game
            </Typography>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Chip
                label={gameInfo.level?.toUpperCase() || "EASY"}
                color={getLevelColor()}
                size="small"
                variant="filled"
                sx={{
                  fontWeight: "bold",
                  boxShadow: `0 2px 8px ${theme.palette[getLevelColor()].main}40`,
                }}
              />
              <Chip
                label={gameInfo.mode?.toUpperCase() || "EDUCATION"}
                color="primary"
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

        {/* Game Stats */}
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(139, 92, 246, 0.2)",
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
              theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(139, 92, 246, 0.2)"
            }`,
          }}
        >
          {/* Score */}
          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
              <Star color={getScoreColor()} fontSize="small" />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                Score
              </Typography>
            </Stack>
            <Typography variant="h6" fontWeight="bold" color={`${getScoreColor()}.main`}>
              {0}
            </Typography>
          </Box>

          {/* Wrong Moves */}
          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
              <Close color="error" fontSize="small" />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                Wrong
              </Typography>
            </Stack>
            <Typography variant="h6" fontWeight="bold" color="error.main">
              {state.wrongMoves || 0}
            </Typography>
          </Box>

          <GameTimer />

        </Stack>

        {/* Actions */}
        <Stack direction="row" spacing={1}>
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
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <RestartAlt />
          </IconButton>

          {state.isCompleted && (
            <Chip
              icon={<EmojiEvents />}
              label="Complete!"
              color="success"
              variant="filled"
              sx={{
                fontWeight: "bold",
                boxShadow: `0 4px 12px ${theme.palette.success.main}40`,
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

export default GameHeader
