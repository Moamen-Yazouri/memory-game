"use client"

import type React from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
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
} from "@mui/icons-material"
import { useMemo, useState } from "react"

interface GameMode {
  id: string
  name: string
  completed: boolean
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  bestTime?: string
  stars: number
}

interface DashboardProps {
  topScore?: number
  currentLevel?: number
  currentMode?: string
  levelProgress?: number
  userRank?: number
  totalPlayers?: number
  finishedModes?: GameMode[]
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
  finishedModes = [
    { id: "1", name: "Classic Mode", completed: true, difficulty: "Easy", bestTime: "2:34", stars: 3 },
    { id: "2", name: "Speed Challenge", completed: true, difficulty: "Medium", bestTime: "1:45", stars: 2 },
    { id: "3", name: "Memory Master", completed: true, difficulty: "Hard", bestTime: "3:12", stars: 3 },
    { id: "4", name: "Expert Challenge", completed: false, difficulty: "Expert", stars: 0 },
  ],
  onThemeToggle,
  onLogout,
}: DashboardProps) {
  const theme = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const bg = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.12) 25%, rgba(168, 85, 247, 0.08) 50%, rgba(236, 72, 153, 0.06) 75%, rgba(99, 102, 241, 0.08) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.4) 0%, rgba(26, 15, 46, 0.5) 25%, rgba(15, 5, 31, 0.4) 50%, rgba(88, 28, 135, 0.3) 75%, rgba(45, 27, 78, 0.4) 100%)",
    [theme],
  )

  const cardBg = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(26, 15, 46, 0.9) 25%, rgba(15, 5, 31, 0.95) 50%, rgba(88, 28, 135, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme],
  )

  const sidebarBg = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 25%, rgba(255, 255, 255, 0.96) 50%, rgba(255, 255, 255, 0.88) 75%, rgba(255, 255, 255, 0.98) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.98) 0%, rgba(26, 15, 46, 0.92) 25%, rgba(15, 5, 31, 0.96) 50%, rgba(88, 28, 135, 0.88) 75%, rgba(45, 27, 78, 0.98) 100%)",
    [theme],
  )

  const getDifficultyColor = (diff: string) => {
    const map = {
      Easy: theme.palette.success.main,
      Medium: theme.palette.warning.main,
      Hard: theme.palette.error.main,
      Expert: theme.palette.secondary.main,
    }
    return map[diff as keyof typeof map] || theme.palette.grey[500]
  }

  const renderStars = (stars: number) =>
    Array.from({ length: 3 }, (_, i) => (
      <Star key={i} sx={{ fontSize: 16, color: i < stars ? theme.palette.warning.main : theme.palette.grey[400] }} />
    ))

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
          theme.palette.mode === "light"
            ? `0 12px 40px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
            : `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px) scale(1.02)",
          boxShadow:
            theme.palette.mode === "light"
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
    if (onLogout) {
      onLogout()
    } else {
      console.log("Logging out...")
    }
    setSettingsOpen(false)
  }

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle()
    } else {
      console.log("Toggling theme...")
    }
  }

  const SettingsMenuItem = ({
    icon,
    title,
    subtitle,
    action,
    iconColor,
  }: {
    icon: React.ReactNode
    title: string
    subtitle: string
    action: React.ReactNode
    iconColor: string
  }) => (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.75) 100%)"
            : "linear-gradient(135deg, rgba(45, 27, 78, 0.8) 0%, rgba(26, 15, 46, 0.6) 50%, rgba(15, 5, 31, 0.75) 100%)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: `1px solid ${theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
        boxShadow:
          theme.palette.mode === "light" ? "0 4px 16px rgba(99, 102, 241, 0.1)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.85) 100%)"
              : "linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 15, 46, 0.7) 50%, rgba(15, 5, 31, 0.85) 100%)",
          transform: "translateX(4px)",
          boxShadow:
            theme.palette.mode === "light" ? "0 6px 20px rgba(99, 102, 241, 0.15)" : "0 6px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: iconColor + "15",
              color: iconColor,
              width: 40,
              height: 40,
              border: `2px solid ${iconColor}30`,
              boxShadow: `0 4px 12px ${iconColor}20`,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>
        {action}
      </Stack>
    </Box>
  )

  return (
    <Box minHeight="100vh" py={4} sx={{ background: bg, backgroundAttachment: "fixed" }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header with Settings Button */}
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
              value={finishedModes.filter((m) => m.completed).length}
              subtitle={`of ${finishedModes.length} total`}
              icon={<SportsEsports />}
              iconColor={theme.palette.success.main}
            />
          </Stack>

          {/* Level Progress */}
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
                theme.palette.mode === "light"
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
                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
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

          {/* Game Modes */}
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Game Modes
            </Typography>
            <Stack spacing={2}>
              {finishedModes.map((mode) => (
                <Paper
                  key={mode.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundImage:
                      theme.palette.mode === "light"
                        ? mode.completed
                          ? "linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(76, 175, 80, 0.05) 100%)"
                          : "linear-gradient(135deg, rgba(158, 158, 158, 0.08) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(158, 158, 158, 0.05) 100%)"
                        : mode.completed
                          ? "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(45, 27, 78, 0.9) 50%, rgba(76, 175, 80, 0.1) 100%)"
                          : "linear-gradient(135deg, rgba(158, 158, 158, 0.15) 0%, rgba(45, 27, 78, 0.9) 50%, rgba(158, 158, 158, 0.1) 100%)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    border: `1px solid ${
                      mode.completed ? theme.palette.success.main + "30" : theme.palette.grey[400] + "20"
                    }`,
                    boxShadow:
                      theme.palette.mode === "light"
                        ? `0 4px 16px ${mode.completed ? theme.palette.success.main + "10" : "rgba(0,0,0,0.05)"}`
                        : `0 4px 16px rgba(0, 0, 0, 0.3)`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? `0 8px 25px ${mode.completed ? theme.palette.success.main + "20" : "rgba(0,0,0,0.1)"}`
                          : `0 8px 25px rgba(0, 0, 0, 0.4)`,
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography fontWeight={600}>{mode.name}</Typography>
                    <Chip
                      label={mode.difficulty}
                      size="small"
                      sx={{
                        backgroundColor: getDifficultyColor(mode.difficulty),
                        color: "#fff",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={0.5}>
                      {renderStars(mode.stars)}
                    </Box>
                    {mode.bestTime && (
                      <Typography variant="body2" color="text.secondary">
                        Best: {mode.bestTime}
                      </Typography>
                    )}
                  </Stack>
                  {!mode.completed && (
                    <Box mt={1}>
                      <Chip
                        label="Not Completed"
                        variant="outlined"
                        size="small"
                        sx={{
                          backdropFilter: "blur(10px)",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      />
                    </Box>
                  )}
                </Paper>
              ))}
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
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)",
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
            border: `1px solid ${theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.2)" : "rgba(139, 92, 246, 0.3)"}`,
            borderLeft: "none",
            zIndex: 1400,
            overflowY: "auto",
            boxShadow:
              theme.palette.mode === "light" ? "8px 0 32px rgba(99, 102, 241, 0.15)" : "8px 0 32px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Stack spacing={0} sx={{ height: "100%" }}>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: `1px solid ${theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
                backgroundImage:
                  theme.palette.mode === "light"
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
                      backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>
            </Box>

            {/* Settings Content */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Stack spacing={3}>
                {/* User Profile */}
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
                  icon={theme.palette.mode === "light" ? <LightMode /> : <DarkMode />}
                  title="Theme"
                  subtitle="Switch appearance"
                  iconColor={theme.palette.mode === "light" ? theme.palette.warning.main : theme.palette.info.main}
                  action={
                    <FormControlLabel
                      control={
                        <Switch
                          checked={theme.palette.mode === "dark"}
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
                borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
                backgroundImage:
                  theme.palette.mode === "light"
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
                    theme.palette.mode === "light"
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
