"use client";

import { useCallback, useContext, useMemo, useState } from "react";
import { Box, Card, CardContent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCardImage } from "./service/getImage.service";
import type { IGameCard } from "@/@types";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import React from "react";

interface IProps extends IGameCard {}

const GameCard = ({ value, isFlipped, isMatched, id }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const { dispatch, state } = useContext(GameInfoContext);

  const imageUrl = useMemo(() => getCardImage(value), [value]);

  const handleFlipped = useCallback(() => {
    if (isMatched || state.openCards.length === 2) return;

    dispatch({ type: "FLIPP_CARD", payload: id });
  }, [isMatched, dispatch, id, state.openCards.length]);

  const cardStyles = useMemo(() => {
    const isLight = theme.palette.mode === "light";
    const gradient = isLight  
      ? "linear-gradient(135deg, rgb(204, 188, 222), rgb(186, 171, 192))"
      : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)";

    const shadows = {
      light: {
        flip: "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
        hover: "0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)",
        normal: "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
      },
      dark: {
        flip: "0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(108, 53, 184, 0.3)",
        hover: "0 6px 20px rgba(0,0,0,0.3), 0 3px 10px rgba(108, 53, 184, 0.25)",
        normal: "0 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(108, 53, 184, 0.15)",
      }
    };

    const shadowSet = isLight ? shadows.light : shadows.dark;
    const currentShadow = isFlipped ? shadowSet.flip : isHovered ? shadowSet.hover : shadowSet.normal;

    return {
      gradient,
      shadow: currentShadow,
      frontBorder: `2px solid ${isLight ? "#e1bee7" : "#6a1b9a"}`,
      backBorder: `2px solid ${isLight ? "#ddd" : "#333"}`,
      backBg: isLight ? "#fff" : "#1a1a1a"
    };
  }, [theme.palette.mode, isFlipped, isHovered]);

  // Optimized mouse handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Box
      onClick={handleFlipped}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: "100%",
        maxWidth: 180,
        height: "100%",
        cursor: "pointer",
        perspective: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.4s ease-out, box-shadow 0.2s ease-out",
          willChange: "transform",
          borderRadius: { xs: 1, sm: 1.5, md: 2 },
          boxShadow: cardStyles.shadow,
          "&:hover": {
            transform: isFlipped 
              ? "rotateY(180deg) translateZ(5px)" 
              : "rotateY(0deg) translateZ(30px)",
          },
        }}
      >
        <Card
          sx={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: { xs: 1, sm: 1.5, md: 2 },
            overflow: "hidden",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: cardStyles.frontBorder,
            transform: "translateZ(0)",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: cardStyles.gradient,
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
                md: "1.8rem",
                lg: "2rem",
              },
              padding: "0 !important",
              margin: 0,
            }}
          >
            ❓
          </CardContent>
        </Card>

        <Card
          sx={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: { xs: 1, sm: 1.5, md: 2 },
            overflow: "hidden",
            backgroundColor: cardStyles.backBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            border: cardStyles.backBorder,
            transform: "rotateY(180deg) translateZ(0)",
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={`Card ${value}`}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: { xs: 0.5, sm: 1, md: 1.5 },
              imageRendering: "auto",
            }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default React.memo(GameCard);