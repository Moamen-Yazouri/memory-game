"use client";

import { useCallback, useMemo, useState } from "react";
import { Box, Card, CardContent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCardImage } from "./service/getImage.service";
import { IGameCard } from "@/@types";

interface IProps extends IGameCard{}

const GameCard = ({ value, isFlipped, isMatched }: IProps) => {
  const [flipped, setFlipped] = useState(isFlipped);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const imageUrl = useMemo(() => {
      return getCardImage(value);
  }, [value]);

  const handleFlipped = useCallback(() => {
      if(isMatched) return;
      setFlipped(!flipped);
  }, [isMatched, flipped]);

  const cardSize = useMemo(() => {
      return {
        width: isMobile ? "28vw" : "120px",
        height: isMobile ? "20vh" : "120px",
        maxWidth: 150,
      };
  }, [isMobile])

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
        perspective: "1000px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        transform: isHovered && !flipped ? "translateY(-2px)" : "translateY(0px)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          boxShadow: getShadow(flipped),
          borderRadius: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            borderRadius: 2,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "rgba(255, 255, 255, 0.1)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 1,
            },
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
              borderRadius: 2,
              fontSize: isMobile ? "1.8rem" : "2rem",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          >
            ❓
          </CardContent>
        </Card>
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
            transition: "transform 0.3s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                theme.palette.mode === "light"
                  ? "rgba(204, 188, 222, 0.1)"
                  : "rgba(108, 53, 184, 0.1)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 1,
            },
          }}
        >
          <img
            src={imageUrl}
            alt={`Card ${value}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default GameCard;
