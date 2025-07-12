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
  useTheme,
} from "@mui/material"
import { KeyboardArrowDown, Dashboard, Home, SportsEsports, LightMode, DarkMode, Logout } from "@mui/icons-material"
import { useState, useMemo } from "react"

interface GameHeaderProps {
  userName?: string
  logoSrc?: string
  onNavigate?: (page: "dashboard" | "home" | "select-game") => void
  onThemeToggle?: () => void
  onLogout?: () => void
}

export default function GameHeader({
  userName = "Player",
  logoSrc = "/logo.png",
  onNavigate,
  onThemeToggle,
  onLogout,
}: GameHeaderProps) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const headerGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.75))"
        : "linear-gradient(135deg, rgba(45,27,78,0.75), rgba(25,15,45,0.70))",
    [theme],
  )

  const menuGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.90))"
        : "linear-gradient(135deg, rgba(45,27,78,0.95), rgba(25,15,45,0.90))",
    [theme],
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleNavigation = (page: "dashboard" | "home" | "select-game") => {
    handleClose()
    onNavigate?.(page)
  }

  const handleThemeToggle = () => {
    onThemeToggle?.()
    // Don't close menu when toggling theme to show immediate feedback
  }

  const handleLogout = () => {
    handleClose()
    onLogout?.()
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
          boxShadow:
            theme.palette.mode === "light"
              ? `0 6px 20px ${theme.palette.primary.main}15`
              : `0 6px 20px rgba(0,0,0,0.4)`,
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

        {/* User Avatar + Dropdown */}
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.85rem",
              border: `2px solid ${theme.palette.primary.main}20`,
            }}
          >
            {getInitials(userName)}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}>
            <Typography variant="body2" fontWeight={600}>
              {userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Welcome back!
            </Typography>
          </Box>
          <KeyboardArrowDown
            sx={{
              fontSize: 20,
              color: theme.palette.text.secondary,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </Box>

      {/* Menu */}
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
              theme.palette.mode === "light"
                ? `0 12px 40px ${theme.palette.primary.main}15`
                : `0 12px 40px rgba(0, 0, 0, 0.4)`,
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
                  theme.palette.mode === "light" ? `${theme.palette.grey[700]}15` : `${theme.palette.warning.main}15`,
                border: `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.warning.main}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.warning.main,
              }}
            >
              {theme.palette.mode === "light" ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
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
            checked={theme.palette.mode === "dark"}
            onChange={handleThemeToggle}
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
    </>
  )
}
