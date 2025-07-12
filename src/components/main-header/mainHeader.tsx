"use client"

import type React from "react"
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Button,
  CircularProgress,
} from "@mui/material"
import {
  KeyboardArrowDown,
  Dashboard,
  Home,
  SportsEsports,
  LightMode,
  DarkMode,
  Logout,
  Login,
  PlayArrow,
} from "@mui/icons-material"
import { useState, useMemo, useContext } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"
import { AuthContext } from "@/providers/auth/authContext"
import SmallLoader from "./components/smallLoader"

interface GameHeaderProps {
  userName?: string
  logoSrc?: string
  onNavigate?: (page: "dashboard" | "home" | "select-game") => void
  onThemeToggle?: () => void
  onLogout?: () => void
  onLogin?: () => void
  onGetStarted?: () => void
}


export default function GameHeader({
  userName = "Player",
  logoSrc = "/logo.png",
  onNavigate,
  onLogout,
  onLogin,
  onGetStarted,
}: GameHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { theme, toggleTheme, mode } = useContext(GameThemeContext)
  const { user, loading } = useContext(AuthContext)
    
  const headerGradient = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.75))"
        : "linear-gradient(135deg, rgba(45,27,78,0.75), rgba(25,15,45,0.70))",
    [mode],
  )

  const menuGradient = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.90))"
        : "linear-gradient(135deg, rgba(45,27,78,0.95), rgba(25,15,45,0.90))",
    [mode],
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleNavigation = (page: "dashboard" | "home" | "select-game") => {
    handleClose()
    onNavigate?.(page)
  }

  const handleLogout = () => {
    handleClose()
    onLogout?.()
  }

  const handleLogin = () => {
    onLogin?.()
  }

  const handleGetStarted = () => {
    onGetStarted?.()
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const menuItems = [
    {
      label: "Home",
      icon: <Home fontSize="small" />,
      action: () => handleNavigation("home"),
      color: theme.palette.primary.main,
    },
    {
      label: "Dashboard",
      icon: <Dashboard fontSize="small" />,
      action: () => handleNavigation("dashboard"),
      color: theme.palette.info.main,
    },
    {
      label: "Select Game",
      icon: <SportsEsports fontSize="small" />,
      action: () => handleNavigation("select-game"),
      color: theme.palette.success.main,
    },
  ]

  // Render different content based on user state
  const renderUserSection = () => {
    if (loading) {
      return <SmallLoader />
    }

    if (!user && !loading) {
      // Not logged in - show login and get started buttons
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Login />}
            onClick={handleLogin}
            sx={{
              borderRadius: 3,
              px: 2,
              py: 0.5,
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "none",
              backgroundImage: headerGradient,
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.primary.main}40`,
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.main + "15",
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}25`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<PlayArrow />}
            onClick={handleGetStarted}
            sx={{
              borderRadius: 3,
              px: 2,
              py: 0.5,
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "none",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
              border: `1px solid ${theme.palette.primary.main}50`,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${theme.palette.primary.main}50`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Get Started
          </Button>
        </Box>
      )
    }

    // Logged in - show user avatar and dropdown
    return (
      <IconButton
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: 5,
          backgroundImage: headerGradient,
          border: `1px solid ${theme.palette.primary.main}30`,
          boxShadow: `0 2px 8px ${theme.palette.primary.main}15`,
          "&:hover": {
            transform: "translateY(-1px)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            background: theme.palette.primary.main,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.85rem",
            border: `2px solid ${theme.palette.primary.main}20`,
          }}
        >
          {getInitials(user?.name || "")}
        </Avatar>
        <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
          {user?.name || ""}
        </Typography>
        <KeyboardArrowDown
          sx={{
            fontSize: 20,
            color: theme.palette.text.secondary,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </IconButton>
    )
  }

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          maxWidth: "95%",
          mx: "auto",
          overflow: "hidden",
          mt: 2,
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundImage: headerGradient,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: `1px solid ${theme.palette.primary.main}20`,
          boxShadow: mode === "light" ? `0 6px 20px ${theme.palette.primary.main}15` : `0 6px 20px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleNavigation("home")}>
          <Box
            component="img"
            src={logoSrc}
            alt="Logo"
            sx={{
              height: 60,
              width: "auto",
              borderRadius: 50,
              border: `1px solid ${theme.palette.primary.main}20`,
              boxShadow: `0 4px 10px ${theme.palette.primary.main}20`,
            }}
          />
        </Box>

        {/* User Section - Dynamic based on auth state */}
        {renderUserSection()}
      </Box>

      {/* Menu - Only show when user is logged in */}
      {user && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          disablePortal
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1,
              minWidth: 200,
              backgroundImage: menuGradient,
              backdropFilter: "blur(25px)",
              border: `1px solid ${theme.palette.primary.main}20`,
              borderRadius: 3,
              boxShadow:
                mode === "light" ? `0 12px 40px ${theme.palette.primary.main}15` : `0 12px 40px rgba(0, 0, 0, 0.4)`,
              "& .MuiMenuItem-root": {
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateX(4px)",
                },
              },
            },
          }}
          MenuListProps={{
            sx: {
              py: 1,
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={item.action}>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              />
            </MenuItem>
          ))}

          {/* Theme Toggle Section */}
          <Divider
            sx={{
              my: 1,
              mx: 2,
              background: `linear-gradient(90deg, transparent, ${theme.palette.text.secondary}30, transparent)`,
            }}
          />

          <MenuItem
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            sx={{
              "&:hover": {
                transform: "none !important",
                backgroundColor: "transparent !important",
              },
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor:
                    mode === "light" ? `${theme.palette.grey[700]}15` : `${theme.palette.warning.main}15`,
                  border: `1px solid ${mode === "light" ? theme.palette.grey[700] : theme.palette.warning.main}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: mode === "light" ? theme.palette.grey[700] : theme.palette.warning.main,
                }}
              >
                {mode === "light" ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Theme"
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            />
            <Switch
              checked={mode === "dark"}
              onClick={toggleTheme}
              size="small"
              sx={{
                ml: 1,
                "& .MuiSwitch-switchBase": {
                  color: theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[600],
                  "&.Mui-checked": {
                    color: theme.palette.warning.main,
                    "& + .MuiSwitch-track": {
                      backgroundColor: theme.palette.warning.main,
                      opacity: 0.5,
                    },
                  },
                },
                "& .MuiSwitch-track": {
                  backgroundColor: theme.palette.grey[400],
                  opacity: 0.5,
                },
              }}
            />
          </MenuItem>

          <Divider
            sx={{
              my: 1,
              mx: 2,
              background: `linear-gradient(90deg, transparent, ${theme.palette.text.secondary}30, transparent)`,
            }}
          />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: `${theme.palette.error.main}15`,
                  border: `1px solid ${theme.palette.error.main}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.error.main,
                }}
              >
                <Logout sx={{ fontSize: 20 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "0.95rem",
                color: theme.palette.error.main,
              }}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  )
}
