"use client"

import { 
  Box,
  Typography,
  Container,
  Paper, 
  Stack, 
  Button, 
  Divider, 
  Chip, 
  Avatar 
} from "@mui/material";

import {
  CheckCircle,
  Timer,
  TrendingUp,
  Dashboard,
  Refresh,
  EmojiEvents,
  Error,
} from "@mui/icons-material";

import { useContext, useMemo } from "react";
import { getDetails } from "./utils/getDetails";
import { GameModesTypes, Levels, LevelsTypes } from "@/@types";
import { renderStars } from "./utils/levelStars";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useNavigate } from "react-router-dom";
import { GameInfoContext } from "@/providers/game-info/gameInfo";

interface LevelCompletedProps {
  level?: Exclude<LevelsTypes, "monster">,
  mode?: GameModesTypes
  score?: number
  time?: string
  wrongMoves?: number
  stars?: number
  isNewRecord?: boolean
}

export default function LevelCompleted({
  level = "medium",
  mode = "education",
  score = 15420,
  time = "2:34",
  wrongMoves = 8,
  isNewRecord = true,
}: LevelCompletedProps) {
  const {theme} = useContext(GameThemeContext) 
  const navigate = useNavigate();
  const {changeLevel} = useContext(GameInfoContext);
  const backgroundGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.12) 25%, rgba(241, 245, 249, 0.18) 50%, rgba(248, 250, 252, 0.10) 75%, rgba(255, 255, 255, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(15, 8, 25, 0.85) 0%, rgba(20, 12, 35, 0.90) 25%, rgba(25, 15, 45, 0.80) 50%, rgba(18, 10, 30, 0.88) 75%, rgba(15, 8, 25, 0.85) 100%)",
    [theme],
  )

  const cardGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme],
  )

  const handleContinue = () => {
    const levels: LevelsTypes[] = Object.values(Levels);
    const currentLevelIndex = levels.indexOf(level);
    const nextLevel = levels[currentLevelIndex + 1];
    changeLevel(nextLevel);
    if (nextLevel) {
      navigate(`/memory-game/game-play`);
    }
  }

  const handleDashboard = () => {
    navigate("/memory-game/dashboard");
  }

  const handleChangeMode = () => {
      navigate("/memory-game/mode-selection");
  }

  const starsNumber = useMemo(() => (renderStars(theme, level)) ,[level]);
  
  const levelDetails = useMemo(() => (getDetails(theme).levelDetails[level]), [level]);

  const modeDetails = useMemo(() => (getDetails(theme).modeDetails[mode]), [mode]);
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            backgroundImage: cardGradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${theme.palette.success.main}25`,
            borderRadius: 4,
            p: 3,
            boxShadow:
              theme.palette.mode === "light"
                ? `0 20px 60px ${theme.palette.success.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : `0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Success Icon */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundImage: cardGradient,
                backdropFilter: "blur(20px)",
                border: `2px solid ${theme.palette.success.main}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${theme.palette.success.main}30`,
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 30,
                  color: theme.palette.success.main,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </Box>

            {/* Completion Message */}
            <Stack spacing={2} textAlign="center" sx={{ width: "100%" }}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Mission Accomplished!
              </Typography>

              {/* Advanced Level & Mode Display */}
              <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" flexWrap="wrap">
                {/* Level Badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    background: levelDetails.gradient,
                    backdropFilter: "blur(15px)",
                    border: `1px solid ${levelDetails.color}30`,
                    boxShadow: `0 4px 16px ${levelDetails.color}20`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: `0 6px 20px ${levelDetails.color}30`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: levelDetails.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      boxShadow: `0 2px 8px ${levelDetails.color}40`,
                    }}
                  >
                    {levelDetails.grid}
                  </Box>
                  <Box textAlign="left">
                    <Typography variant="body2" fontWeight={700} color="white" sx={{ lineHeight: 1 }}>
                      {level}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1 }}>
                      {levelDetails.difficulty}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                  •
                </Typography>

                {/* Mode Badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    background: modeDetails.gradient,
                    backdropFilter: "blur(15px)",
                    border: `1px solid ${modeDetails.color}30`,
                    boxShadow: `0 4px 16px ${modeDetails.color}20`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: `0 6px 20px ${modeDetails.color}30`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: `${modeDetails.color}15`,
                      border: `2px solid ${modeDetails.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: modeDetails.color,
                      boxShadow: `0 2px 8px ${modeDetails.color}20`,
                    }}
                  >
                    {modeDetails.icon}
                  </Box>
                  <Box textAlign="left">
                    <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ lineHeight: 1 }}>
                      {mode.replace(" Mode", "")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                      {modeDetails.description}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Stars */}
              <Box display="flex" justifyContent="center" gap={0.5}>
                {starsNumber}
              </Box>
            </Stack>

            {/* Statistics - Compact Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.warning.main + "15",
                    color: theme.palette.warning.main,
                    width: 32,
                    height: 32,
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Score
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {score.toLocaleString()}
                </Typography>
                {isNewRecord && (
                  <Chip
                    label="New!"
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: "0.6rem",
                      backgroundColor: theme.palette.success.main,
                      color: "white",
                      mt: 0.5,
                    }}
                  />
                )}
              </Box>

              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.info.main + "15",
                    color: theme.palette.info.main,
                    width: 32,
                    height: 32,
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <Timer sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Time
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {time}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.error.main + "15",
                    color: theme.palette.error.main,
                    width: 32,
                    height: 32,
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <Error sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Wrong
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {wrongMoves}
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                width: "100%",
                background: `linear-gradient(90deg, transparent, ${theme.palette.text.secondary}30, transparent)`,
              }}
            />

            {/* Action Buttons - Compact */}
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<TrendingUp />}
                onClick={handleContinue}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}50`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Next
              </Button>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<Dashboard />}
                onClick={handleDashboard}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundImage: cardGradient,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.info.main}40`,
                  color: theme.palette.info.main,
                  "&:hover": {
                    backgroundColor: theme.palette.info.main + "15",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Dashboard
              </Button>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<Refresh />}
                onClick={handleChangeMode}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundImage: cardGradient,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.warning.main}40`,
                  color: theme.palette.warning.main,
                  "&:hover": {
                    backgroundColor: theme.palette.warning.main + "15",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Change
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
