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
} from "@mui/icons-material"
import { useContext, useMemo, useState } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext"
import { getFinishedNumber, getFinsished } from "./utils/getFinished"
import authService from "@/service/auth.service"
import { calculateModeStars, getModeColor, getModeDescription, getModeDetails, getModeDisplayName } from "./utils/getModeDetails"
import SettingsMenuItem from "./components/SettingsMenuItems"
import { renderStars } from "./utils/renderStars"
import { getBgGradients, getCardBg, getSidebarBg } from "./utils/getGradients"
import { getModeIcon } from "./utils/getModeIcon"
import { formatTime } from "./utils/formatTime"
import { StatCard } from "./components/StateCard"
import CompletedList from "./components/completedList"

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
  }, [playerState.finished]);

  const bg = useMemo(() => getBgGradients(mode), [mode]);

  const cardBg = useMemo(() => getCardBg(mode), [mode])
  const sidebarBg = useMemo(() => getSidebarBg(mode), [mode])  
  const numberOfFinishedModes = useMemo(() => getFinishedNumber(playerState.finished), [playerState.finished]);
  const completedModes = getModeDetails(playerState.finished);
  


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
              value={playerState.currentInfo.level}
              subtitle={getModeDescription(playerState.currentInfo.modeName)}
              icon={<TrackChanges />}
              iconColor={theme.palette.info.main}
            />
            <StatCard
              title="Current Mode"
              value={getModeDisplayName(playerState.currentInfo.modeName)}
              subtitle={getModeDescription(playerState.currentInfo.modeName)}
              icon={<TrackChanges />}
              iconColor={theme.palette.info.main}
            />
            <StatCard
              title="Completed Modes"
              value={numberOfFinishedModes}
              subtitle={`game modes mastered`}
              icon={<SportsEsports />}
              iconColor={theme.palette.success.main}
            />
            <StatCard
              title="Completed Levels"
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

          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Completed Game Modes
            </Typography>
            <CompletedList completedModes={completedModes}/>
          </Stack>
        </Stack>

      </Container>

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
