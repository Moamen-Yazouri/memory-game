import { useCallback, useContext, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { getGradients, getShadows } from "../../game-board/utils/getGradient";

interface IProps {
    isMatched: boolean,
    isFlipped: boolean,
    id: number,
}
const useGameBoard = ({isMatched, isFlipped, id}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const { gameDispatch, gameState } = useContext(GameInfoContext);
  const isAllFlipped = useMemo(() => {
    const allFlipped = gameState.cards.every((c) => c.isFlipped);
    return allFlipped;
  }, [gameState.cards])

  const handleFlipped = useCallback(() => {
    if (isMatched || gameState.openCards.length === 2 || isAllFlipped) return;

    gameDispatch({ type: "FLIPP_CARD", payload: id });
  }, [isMatched, gameDispatch, id, gameState.openCards.length]);

  const cardStyles = useMemo(() => {
    const isLight = theme.palette.mode === "light";
    const gradient = getGradients(theme.palette.mode);


    const shadowSet = getShadows(theme.palette.mode);
    const currentShadow = isFlipped ? shadowSet.flip : isHovered ? shadowSet.hover : shadowSet.normal;

    return {
      gradient,
      shadow: currentShadow,
      frontBorder: `2px solid ${isLight ? "#e1bee7" : "#6a1b9a"}`,
      backBorder: `2px solid ${isLight ? "#ddd" : "#333"}`,
      backBg: isLight ? "#fff" : "#1a1a1a"
    };
  }, [theme.palette.mode, isFlipped, isHovered]);

  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  return {
    cardStyles,
    handleFlipped,
    handleMouseEnter,
    handleMouseLeave,

  }
}

export default useGameBoard