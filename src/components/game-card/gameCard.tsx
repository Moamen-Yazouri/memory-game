import { 
  Box, 
  Card, 
  CardContent, 
} from "@mui/material";

import type { IGameCard } from "@/@types";
import React from "react";
import useGameBoard from "./hook/useGameBoard";


interface IProps extends IGameCard {
  imageUrl: string;
};

const GameCard = (props: IProps) => {
  const {
    cardStyles,
    handleFlipped,
    handleMouseEnter,
    handleMouseLeave,
  } = useGameBoard({...props});

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
          transform: props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.4s ease-out, box-shadow 0.2s ease-out",
          willChange: "transform",
          borderRadius: { xs: 1, sm: 1.5, md: 2 },
          boxShadow: cardStyles.shadow,
          "&:hover": {
            transform: props.isFlipped 
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
            src={props.imageUrl}
            alt={`Card ${props.value}`}
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