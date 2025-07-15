

import type React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import CardStatsOverlay from "./cardStatesOverlay";

interface IProps {
  time: number;
  score: number;
  starsNumber: number;
  wrongMoves: number;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function MemoryCardWithOverlay({
  time,
  score,
  starsNumber,
  wrongMoves,
  children,
  disabled = false,
}: IProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect.left + rect.width + 10;
    let top = rect.top;

    if (left + 200 > viewportWidth) {
      left = rect.left - 210;
    }

    if (top + 200 > viewportHeight) {
      top = viewportHeight - 220;
    }

    setOverlayPosition({ top, left });
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          "&:hover": !disabled
            ? {
                transform: "translateY(-2px)",
                filter: "brightness(1.1)",
              }
            : {},
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <CardStatsOverlay
          wrongMoves={wrongMoves}
          time={formatTime(time)}
          score={score}
          stars={starsNumber}
          visible={showOverlay}
          position={{
            top: overlayPosition.top,
            left: overlayPosition.left,
          }}
          isMonsterLevel={false} 
        />
      </Box>
    </>
  );
}
