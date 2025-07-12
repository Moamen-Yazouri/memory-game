import { GameModesTypes, LevelsTypes } from "@/@types";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { getCompletedAndUnlocked } from "../utils/getCompletedLevelst";
import { getBackgroundGradient, getCardGradient } from "../utils/getGradients";
import { getGameModesAndLevels } from "../constants";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { useNavigate } from "react-router-dom";

export const useSelectGame = () => {
    const {mode, theme} = useContext(GameThemeContext);
    const [selectedMode, setSelectedMode] = useState<GameModesTypes | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<LevelsTypes | null>(null);
    const {playerState, playerDispatch} = useContext(PlayerInfoContext);
    const {changeLevel, changeMode} = useContext(GameInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
    if (selectedMode && selectedLevel) {
        changeLevel(selectedLevel);
        changeMode(selectedMode);
        playerDispatch({type: "CHANGE_CURRENT", payload: {modeName: selectedMode, level: selectedLevel}});
        navigate("/memory-game/game-play");
    }
  }, [selectedMode, selectedLevel]);


    const [completedLevels, unlockedLevels] = useMemo(() => {
        return getCompletedAndUnlocked(playerState.finished);
    }, [playerState.finished]);
    const backgroundGradient = useMemo(
        () => (
        getBackgroundGradient(mode)
    
    ), [mode]);

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

  return  {
    selectedMode,
    selectedLevel,
    gameModes,
    levels,
    backgroundGradient,
    cardGradient,
    theme,
    unlockedLevels,
    setSelectedMode,
    handleModeSelect,
    handleLevelSelect,
    isLevelCompleted,
    isLevelUnlocked
  } 
}