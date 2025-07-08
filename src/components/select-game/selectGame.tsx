"use client"

import { Box, Typography, Container, Stack, Button, Chip } from "@mui/material"
import { Lock, CheckCircle, ArrowBack } from "@mui/icons-material"
import { useMemo, useState, useEffect, useContext } from "react"
import { getGameModesAndLevels } from "./constants"
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext"
import { getCompletedAndUnlocked } from "./utils/getCompletedLevelst"
import { getBackgroundGradient, getCardGradient } from "./utils/getGradients"
import {GameThemeContext} from "@/providers/theme/themeContext"
import { GameModesTypes, LevelsTypes } from "@/@types"




export default function SelectGame() {
  const {mode, theme} = useContext(GameThemeContext);
  
  const [selectedMode, setSelectedMode] = useState<GameModesTypes | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<LevelsTypes | null>(null)
  const {playerState} = useContext(PlayerInfoContext);

  const [completedLevels, unlockedLevels] = useMemo(() => {
    return getCompletedAndUnlocked(playerState.finished)
  }
  , [playerState.finished]);
  const backgroundGradient = useMemo(
    () => (getBackgroundGradient(mode))
  ,[mode]);

  const cardGradient = useMemo(
    () => (getCardGradient(mode))
  ,[mode]);
  const {gameModes, levels} = getGameModesAndLevels(theme);


  const handleModeSelect = (mode: GameModesTypes) => {
    setSelectedMode(mode)
    
  }

  const handleLevelSelect = (level: LevelsTypes) => {
    setSelectedLevel(level)
  }



  const isLevelUnlocked = (mode: GameModesTypes, level: LevelsTypes) => {
    return unlockedLevels[mode].includes(level) || false
  }

  const isLevelCompleted = (mode: GameModesTypes, level: LevelsTypes) => {
    return completedLevels[mode].includes(level) || false
  }

  useEffect(() => {
    if (selectedMode && selectedLevel) {
      // Auto-start game after both selections
      setTimeout(() => {
        
      }, 500)
    }
  }, [selectedMode, selectedLevel])

  const ModeCard = ({ mode }: { mode: (typeof gameModes)[0] }) => (
    <Box
      onClick={() => handleModeSelect(mode.id)}
      sx={{
        position: "relative",
        width: { xs: "100%", sm: "280px" },
        height: "200px",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(${mode.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.05) translateY(-8px)",
          boxShadow: `0 20px 60px ${mode.color}30`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${mode.color}40 0%, ${mode.color}20 50%, ${mode.color}30 100%)`,
          zIndex: 1,
        },
      }}
    >
      {/* Glass overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: cardGradient,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${mode.color}30`,
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: `${mode.color}20`,
            border: `2px solid ${mode.color}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            color: mode.color,
            boxShadow: `0 4px 16px ${mode.color}30`,
          }}
        >
          {mode.icon}
        </Box>
        <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
          {mode.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mode.description}
        </Typography>
      </Box>
    </Box>
  )

  const LevelCard = ({ level }: { level: (typeof levels)[0] }) => {
    const isUnlocked = selectedMode ? isLevelUnlocked(selectedMode, level.id as LevelsTypes) : false
    const isCompleted = selectedMode ? isLevelCompleted(selectedMode, level.id as LevelsTypes) : false

    return (
      <Box
        onClick={() => isUnlocked && handleLevelSelect(level.id as LevelsTypes)}
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "250px" },
          height: "160px",
          borderRadius: 3,
          cursor: isUnlocked ? "pointer" : "not-allowed",
          backgroundImage: cardGradient,
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: `1px solid ${isUnlocked ? level.color + "30" : theme.palette.grey[400] + "20"}`,
          boxShadow: isUnlocked ? `0 8px 32px ${level.color}15` : `0 4px 16px ${theme.palette.grey[400]}10`,
          opacity: isUnlocked ? 1 : 0.6,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": isUnlocked
            ? {
                transform: "scale(1.05) translateY(-4px)",
                boxShadow: `0 12px 40px ${level.color}25`,
              }
            : {},
        }}
      >
        {/* Status indicators */}
        <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
          {isCompleted ? (
            <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 24 }} />
          ) : !isUnlocked ? (
            <Lock sx={{ color: theme.palette.grey[400], fontSize: 24 }} />
          ) : null}
        </Box>

        {/* Content */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            textAlign: "center",
          }}
        >
          <Chip
            label={level.name}
            sx={{
              backgroundColor: isUnlocked ? level.color : theme.palette.grey[400],
              color: "white",
              fontWeight: 600,
              mb: 2,
              fontSize: "1rem",
              px: 2,
              py: 1,
              height: "auto",
            }}
          />
          <Typography variant="body1" fontWeight={500} color="text.primary" mb={1}>
            {level.cards}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {level.description}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        backgroundAttachment: "fixed",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          {!selectedMode ? (
            <>
              {/* Mode Selection */}
              <Box textAlign="center" mb={4}>
                <Typography variant="h3" fontWeight={700} color="text.primary" mb={2}>
                  Select Game Mode
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Choose your preferred game category
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  maxWidth: "1000px",
                }}
              >
                {gameModes.map((mode) => (
                  <ModeCard key={mode.id} mode={mode} />
                ))}
              </Box>
            </>
          ) : (
            <>
              {/* Level Selection */}
              <Box textAlign="center" mb={4}>
                <Typography variant="h3" fontWeight={700} color="text.primary" mb={2}>
                  Select Difficulty Level
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={3}>
                  Choose your challenge level for{" "}
                  <span style={{ color: gameModes.find((m) => m.id === selectedMode)?.color }}>
                    {gameModes.find((m) => m.id === selectedMode)?.name}
                  </span>{" "}
                  mode
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => setSelectedMode(null)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    backgroundImage: cardGradient,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.primary.main}30`,
                  }}
                >
                  Change Mode
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  maxWidth: "800px",
                }}
              >
                {levels.map((level) => (
                  <LevelCard key={level.id} level={level} />
                ))}
              </Box>

              {/* Progress indicator */}
              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Unlocked levels: {selectedMode ? unlockedLevels[selectedMode]?.length || 0 : 0} /{" "}
                  {levels.length}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
