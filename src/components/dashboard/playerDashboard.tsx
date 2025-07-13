"use client"

import type React from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Chip,
  LinearProgress,
  Avatar,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
  Backdrop,
  Slide,
} from "@mui/material"
import {
  Star,
  EmojiEvents,
  TrendingUp,
  TrackChanges,
  MilitaryTech,
  SportsEsports,
  Settings,
  Logout,
  LightMode,
  DarkMode,
  Close,
  Person,
  Notifications,
  School,
  Favorite,
  Event,
  LocationOn,
} from "@mui/icons-material"
import { useContext, useMemo, useState } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext"
import { getFinishedNumber, getFinsished } from "./utils/getFinished"
import authService from "@/service/auth.service"
import { calculateModeStars, getModeDetails } from "./utils/getModeDetails"
import SettingsMenuItem from "./components/SettingsMenuItems"
import { renderStars } from "./utils/renderStars"

// Import the types (assuming they exist)
type LevelsTypes = "easy" | "medium" | "hard" | "veryHard" | "expert"
type GameModesTypes = "education" | "emotional" | "events" | "states"

export interface IFinishedLevel {
  level: LevelsTypes
  mode: GameModesTypes
  score: number
  time: number
  wrongMoves: number
}

interface CompletedMode {
  mode: GameModesTypes
  totalScore: number
  levelsCompleted: number
  averageTime: number
  totalWrongMoves: number
  bestScore: number
}

interface DashboardProps {
  topScore?: number
  currentLevel?: number
  currentMode?: string
  levelProgress?: number
  userRank?: number
  totalPlayers?: number
  finishedLevels?: IFinishedLevel[]
  onThemeToggle?: () => void
  onLogout?: () => void
}

export default function MemoryGameDashboard({
  topScore = 15420,
  currentLevel = 12,
  currentMode = "Classic Mode",
  levelProgress = 75,
  userRank = 247,
  totalPlayers = 10000,
}: DashboardProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { toggleTheme, theme, mode } = useContext(GameThemeContext)
  const {playerState} = useContext(PlayerInfoContext);

  const finishedLevels = useMemo(() => {
      return getFinsished(playerState.finished);
  }, [playerState.finished])
  const bg = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.12) 25%, rgba(241, 245, 249, 0.18) 50%, rgba(248, 250, 252, 0.10) 75%, rgba(255, 255, 255, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(15, 8, 25, 0.85) 0%, rgba(20, 12, 35, 0.90) 25%, rgba(25, 15, 45, 0.80) 50%, rgba(18, 10, 30, 0.88) 75%, rgba(15, 8, 25, 0.85) 100%)",
    [mode],
  )

  const cardBg = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [mode],
  )

  const sidebarBg = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.92) 25%, rgba(241, 245, 249, 0.96) 50%, rgba(236, 242, 248, 0.88) 75%, rgba(255, 255, 255, 0.98) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.98) 0%, rgba(35, 20, 60, 0.92) 25%, rgba(25, 15, 45, 0.96) 50%, rgba(30, 18, 55, 0.88) 75%, rgba(45, 27, 78, 0.98) 100%)",
    [mode],
  )

  
  const getModeDisplayName = (gameMode: GameModesTypes): string => {
    const modeNames = {
      education: "Education Mode",
      emotional: "Emotional Mode",
      events: "Events Mode",
      states: "States Mode",
    }
    return modeNames[gameMode];
  }

  const getModeIcon = (gameMode: GameModesTypes): React.ReactNode => {
    const icons = {
      education: <School sx={{ fontSize: 20 }} />,
      emotional: <Favorite sx={{ fontSize: 20 }} />,
      events: <Event sx={{ fontSize: 20 }} />,
      states: <LocationOn sx={{ fontSize: 20 }} />,
    }
    return icons[gameMode] || <SportsEsports sx={{ fontSize: 20 }} />
  }

  const getModeColor = (gameMode: GameModesTypes) => {
    const colorMap = {
      education: theme.palette.info.main,
      emotional: theme.palette.error.main,
      events: theme.palette.warning.main,
      states: theme.palette.success.main,
    }
    return colorMap[gameMode] || theme.palette.primary.main
  }

  const getModeDescription = (gameMode: GameModesTypes): string => {
    const descriptions = {
      education: "Learn while you play",
      emotional: "Express your feelings",
      events: "Remember special moments",
      states: "Geography challenge",
    }
    return descriptions[gameMode] || "Game mode"
  }
  const numberOfFinishedModes = useMemo(() => getFinishedNumber(playerState.finished), [playerState.finished]);

  const completedModes = getModeDetails(playerState.finished);
  

  
  

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
  }: {
    title: string
    value: string | number
    subtitle?: string
    icon: React.ReactNode
    iconColor: string
  }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundImage: cardBg,
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: `1px solid ${theme.palette.primary.main}20`,
        boxShadow:
          mode === "light"
            ? `0 12px 40px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
            : `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px) scale(1.02)",
          boxShadow:
            mode === "light"
              ? `0 16px 50px ${theme.palette.primary.main}25, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
              : `0 16px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Avatar
          sx={{
            bgcolor: iconColor + "15",
            color: iconColor,
            width: 32,
            height: 32,
            border: `2px solid ${iconColor}30`,
            boxShadow: `0 4px 12px ${iconColor}25`,
          }}
        >
          {icon}
        </Avatar>
      </Box>
      <Typography variant="h4" fontWeight={600}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  )

  const handleLogout = () => {
    authService.logout();
    setSettingsOpen(false)
  }
  const handleThemeToggle = () => {
    toggleTheme()
  }

  

  return (
    <Box minHeight="100vh" py={4} sx={{ background: bg, backgroundAttachment: "fixed" }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h4" fontWeight={700}>
                Memory Game Dashboard
              </Typography>
              <Typography color="text.secondary">Track your progress and achievements</Typography>
            </Box>
            <IconButton
              onClick={() => setSettingsOpen(true)}
              sx={{
                bgcolor: theme.palette.primary.main + "15",
                color: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}30`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 4px 16px ${theme.palette.primary.main}25`,
                "&:hover": {
                  bgcolor: theme.palette.primary.main + "25",
                  transform: "scale(1.05)",
                  boxShadow: `0 6px 20px ${theme.palette.primary.main}35`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Settings />
            </IconButton>
          </Box>

          {/* Stats Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} useFlexGap flexWrap="wrap">
            <StatCard
              title="Top Score"
              value={topScore.toLocaleString()}
              subtitle="Personal best"
              icon={<MilitaryTech />}
              iconColor={theme.palette.warning.main}
            />
            <StatCard
              title="Current Level"
              value={currentLevel}
              subtitle={currentMode}
              icon={<TrackChanges />}
              iconColor={theme.palette.info.main}
            />
            <StatCard
              title="Your Rank"
              value={`#${userRank}`}
              subtitle={`of ${totalPlayers?.toLocaleString()} players`}
              icon={<EmojiEvents />}
              iconColor={theme.palette.primary.main}
            />
            <StatCard
              title="Completed Modes"
              value={numberOfFinishedModes}
              subtitle={`game modes mastered`}
              icon={<SportsEsports />}
              iconColor={theme.palette.success.main}
            />
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundImage: cardBg,
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              border: `1px solid ${theme.palette.primary.main}20`,
              boxShadow:
                mode === "light"
                  ? `0 12px 40px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                  : `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TrendingUp
                  sx={{ color: theme.palette.primary.main, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                />
                <Typography fontWeight={600}>Level Progress - {currentMode}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Level {currentLevel}</Typography>
                <Typography fontWeight={600}>{levelProgress}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={levelProgress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 6,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.warning.main} 100%)`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  },
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" color="text.secondary">
                  Current Progress
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Next: Level {currentLevel + 1}
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* Completed Modes */}
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Completed Game Modes
            </Typography>
            <Stack spacing={2}>
              {completedModes.map((modeData) => {
                const stars = calculateModeStars(modeData)
                const modeColor = getModeColor(modeData.mode)
                const modeIcon = getModeIcon(modeData.mode)

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
                        {renderStars(stars, theme)}
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
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      {/* Settings Sidebar */}
      <Backdrop
        open={settingsOpen}
        onClick={() => setSettingsOpen(false)}
        sx={{
          zIndex: 1300,
          backgroundColor: mode === "light" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
      <Slide direction="right" in={settingsOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: { xs: "85vw", sm: "400px" },
            backgroundImage: sidebarBg,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${mode === "light" ? "rgba(99, 102, 241, 0.2)" : "rgba(139, 92, 246, 0.3)"}`,
            borderLeft: "none",
            zIndex: 1400,
            overflowY: "auto",
            boxShadow: mode === "light" ? "8px 0 32px rgba(99, 102, 241, 0.15)" : "8px 0 32px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Stack spacing={0} sx={{ height: "100%" }}>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: `1px solid ${mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
                backgroundImage:
                  mode === "light"
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)"
                    : "linear-gradient(135deg, rgba(45, 27, 78, 0.6) 0%, rgba(26, 15, 46, 0.4) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Settings
                    sx={{ color: theme.palette.primary.main, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  />
                  <Typography variant="h5" fontWeight={600}>
                    Settings
                  </Typography>
                </Stack>
                <IconButton
                  onClick={() => setSettingsOpen(false)}
                  sx={{
                    color: theme.palette.text.secondary,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
              <Stack spacing={3}>
                <SettingsMenuItem
                  icon={<Person />}
                  title="Profile"
                  subtitle="Manage your account"
                  iconColor={theme.palette.secondary.main}
                  action={
                    <IconButton size="small">
                      <TrendingUp sx={{ fontSize: 16 }} />
                    </IconButton>
                  }
                />

                {/* Theme Toggle */}
                <SettingsMenuItem
                  icon={mode === "light" ? <LightMode /> : <DarkMode />}
                  title="Theme"
                  subtitle="Switch appearance"
                  iconColor={mode === "light" ? theme.palette.warning.main : theme.palette.info.main}
                  action={
                    <FormControlLabel
                      control={
                        <Switch
                          checked={mode === "dark"}
                          onChange={handleThemeToggle}
                          size="small"
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label=""
                    />
                  }
                />

                {/* Notifications */}
                <SettingsMenuItem
                  icon={<Notifications />}
                  title="Notifications"
                  subtitle="Manage alerts"
                  iconColor={theme.palette.info.main}
                  action={
                    <Switch
                      defaultChecked
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: theme.palette.success.main,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: theme.palette.success.main,
                        },
                      }}
                    />
                  }
                />
              </Stack>
            </Box>

            {/* Footer with Logout */}
            <Box
              sx={{
                p: 3,
                borderTop: `1px solid ${mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
                backgroundImage:
                  mode === "light"
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)"
                    : "linear-gradient(135deg, rgba(45, 27, 78, 0.6) 0%, rgba(26, 15, 46, 0.4) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                  backgroundImage:
                    mode === "light"
                      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(45, 27, 78, 0.3) 0%, rgba(26, 15, 46, 0.1) 100%)",
                  backdropFilter: "blur(15px)",
                  border: `2px solid ${theme.palette.error.main}40`,
                  boxShadow: `0 4px 16px ${theme.palette.error.main}20`,
                  "&:hover": {
                    borderColor: theme.palette.error.dark,
                    backgroundColor: theme.palette.error.main + "15",
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 20px ${theme.palette.error.main}30`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Box>
  )
}
