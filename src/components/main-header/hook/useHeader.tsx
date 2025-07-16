import {  
    Dashboard,
    Home,
    SportsEsports,
} from "@mui/icons-material";
import { AuthContext } from "@/providers/auth/authContext";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../types";
import authService from "@/service/auth.service";
import { getInitials } from "../utils/getInitials";
import { toast } from "sonner";
export const useHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { theme, toggleTheme, mode } = useContext(GameThemeContext);
  const { user, loading } = useContext(AuthContext);

  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigation = (page: Page) => {
    handleClose();
    navigate(page)
  }

  const handleLogout = () => {
    setLoggingOut(true);
    authService.logout()
    .then(() => {
        navigate("/sign-in");
        logout();
      })
      .catch(() => toast.error("Something went wrong"))
    .finally(() => {
      setLoggingOut(false);
      handleClose();
    })
    
  }

  const handleLogin = () => {
    navigate("/sign-in")
  }

  const handleGetStarted = () => {
    navigate("/sign-up")
  }

  const formatedName = useMemo(() => {
        return getInitials(user?.name || "")
  }, [user?.name])

  const menuItems = [
    {
      label: "Home",
      icon: <Home fontSize="small" />,
      action: () => handleNavigation("/"),
      color: theme.palette.primary.main,
    },
    {
      label: "Dashboard",
      icon: <Dashboard fontSize="small" />,
      action: () => handleNavigation("/memory-game/dashboard"),
      color: theme.palette.info.main,
    },
    {
      label: "Select Game",
      icon: <SportsEsports fontSize="small" />,
      action: () => handleNavigation("/memory-game/mode-selection"),
      color: theme.palette.success.main,
    },
  ]

  return {
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
  }
}