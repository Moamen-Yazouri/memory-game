import { AuthContext } from "@/providers/auth/authContext";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useContext, useMemo, useState } from "react";
import { getBgGradients, getCardBg, getSidebarBg } from "../utils/getGradients";
import { getFinishedLevelsNumber, getFinishedNumber } from "../utils/getFinished";
import { getTopScore } from "../utils/getTopScore";
import { getModeDetails } from "../utils/getModeDetails";
import { getNextLevel } from "../utils/getNextLevel";
import { getLevelPercentage } from "../utils/getDiplayLevel";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils/formatName";
import authService from "@/service/auth.service";

export const useDashboard = () => {
      
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { 
    toggleTheme, 
    theme, 
    mode 
  } = useContext(GameThemeContext);
  const { playerState } = useContext(PlayerInfoContext);
  const { user, loading, logout } = useContext(AuthContext);
  const bg = useMemo(() => getBgGradients(mode), [mode]);
  const cardBg = useMemo(() => getCardBg(mode), [mode]);
  const sidebarBg = useMemo(() => getSidebarBg(mode), [mode]);  
  const numberOfFinishedModes = useMemo(() => getFinishedNumber(playerState.finished), [playerState.finished]);
  const numberOfFinishedlevels = useMemo(() => getFinishedLevelsNumber(playerState.finished), [playerState.finished]);
  const topScore = useMemo(() => getTopScore(playerState.finished), [playerState.finished]);
  const completedModes = getModeDetails(playerState.finished);
  const nextLevel = useMemo(() => getNextLevel(playerState.currentInfo.level), [playerState.currentInfo]);
  const progress = useMemo(() => getLevelPercentage(playerState.currentInfo.level), [playerState]);
  const navigate = useNavigate();
  const initials = useMemo(() => getInitials(user), [user]);
  console.log(playerState)
  const handleNavigate = (page: "/" | "/memory-game/mode-selection") => {
    navigate(page);
  }
  const handleLogout = () => {
    authService.logout().then(() => logout());
    setSettingsOpen(false);
  }
  const handleThemeToggle = () => {
    toggleTheme();
  }
    return {
    settingsOpen,
    theme,
    mode,
    bg,
    cardBg,
    sidebarBg,
    numberOfFinishedModes,
    numberOfFinishedlevels,
    topScore,
    completedModes,
    nextLevel,
    progress,
    initials,
    user,
    loading,
    playerState,
    setSettingsOpen,
    handleNavigate,
    handleLogout,
    handleThemeToggle,
  };
}