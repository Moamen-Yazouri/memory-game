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
} from "@mui/material";

import {
  KeyboardArrowDown,
  LightMode,
  DarkMode,
  Logout,
  Login,
  PlayArrow,
} from "@mui/icons-material";

import SmallLoader from "./components/smallLoader";
import { useHeader } from "./hook/useHeader";



export default function GameHeader() {
    const {
        anchorEl,
        open,
        user,
        loading,
        loggingOut,
        theme,
        mode,
        headerGradient,
        menuGradient,
        formatedName,
        menuItems,
        handleClick,
        handleClose,
        handleLogout,
        handleNavigation,
        handleLogin,
        handleGetStarted,
        toggleTheme,
    } = useHeader()

  const renderUserSection = () => {
    if (loading || loggingOut) {
      return <SmallLoader />
    }

    if (!user && !loading && !loggingOut) {
      
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
          <IconButton onClick={toggleTheme}>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      )
    }

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
          {formatedName}
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
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleNavigation("/")}>
          <Box
            component="img"
            src={"/logo.png"}
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


        {renderUserSection()}
      </Box>

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
