"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCardImage } from "./service/getImage.service";
import { IGameCard } from "@/@types";
import { GameInfoContext } from "@/providers/game-info/gameInfo";

interface IProps extends IGameCard {}

const GameCard = ({ value, isFlipped, isMatched, id }: IProps) => {
  const [flipped, setFlipped] = useState(isFlipped);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { dispatch, state } = useContext(GameInfoContext);

  const imageUrl = useMemo(() => getCardImage(value), [value]);

  useEffect(() => {
      if(isMatched) return;
      setFlipped(isFlipped);
  }, [isFlipped]);

  const handleFlipped = useCallback(() => {
    if (isMatched || state.openCards.length == 2) return;
    dispatch({ type: "FLIPP_CARD", payload: id });
  }, [isMatched, dispatch, id]);

  const cardSize = useMemo(() => ({
    width: isMobile ? "28vw" : "120px",
    height: isMobile ? "20vh" : "120px",
    maxWidth: 150,
  }), [isMobile]);

  const gradient = theme.palette.mode === "light"
    ? "linear-gradient(135deg, rgb(204, 188, 222), rgb(186, 171, 192))"
    : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)";

  const getShadow = useCallback(
    (isFlipping: boolean) => {
      const light = {
        flip: "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
        hover: "0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)",
        normal: "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
      };
      const dark = {
        flip: "0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(108, 53, 184, 0.3)",
        hover: "0 6px 20px rgba(0,0,0,0.3), 0 3px 10px rgba(108, 53, 184, 0.25)",
        normal: "0 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(108, 53, 184, 0.15)",
      };
      const shadow = theme.palette.mode === "light" ? light : dark;
      return isFlipping ? shadow.flip : isHovered ? shadow.hover : shadow.normal;
    },
    [isHovered, theme.palette.mode]
  );

  return (
    <Box
  onClick={handleFlipped}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  sx={{
    ...cardSize,
    cursor: "pointer",
    perspective: "1000px",
  }}
>
  <Box
    sx={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
      borderRadius: 2,
      boxShadow: getShadow(flipped),
    }}
  >
    {/* Front Side (Question Mark) */}
    <Card
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backfaceVisibility: "hidden",
        borderRadius: 2,
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: gradient,
          fontSize: isMobile ? "1.8rem" : "2rem",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      >
        ❓
      </CardContent>
    </Card>

    {/* Back Side (Image) */}
    <Card
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <img
        src={imageUrl}
        alt={`Card ${value}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Card>
  </Box>
</Box>

  );
};

export default GameCard;
