import type React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { Timer, Error, Star, EmojiEvents } from "@mui/icons-material";
import { useContext } from "react";
import { GameThemeContext } from "@/providers/theme/themeContext";

interface CardStatsOverlayProps {
  wrongMoves: number;
  time: string;
  score: number;
  stars: number;
  visible: boolean;
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  isMonsterLevel?: boolean;
}

export default function CardStatsOverlay({
  wrongMoves,
  time,
  score,
  stars,
  visible,
  position = { top: 0, left: 0 },
  isMonsterLevel = false,
}: CardStatsOverlayProps) {
  const { theme, mode } = useContext(GameThemeContext);

  const monsterColor = "#FF4500";
  const glowColor = "rgba(255, 69, 0, 0.6)";

  const overlayGradient = isMonsterLevel
    ? mode === "light"
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 240, 230, 0.90) 25%, rgba(255, 69, 0, 0.15) 50%, rgba(220, 20, 60, 0.10) 75%, rgba(255, 255, 255, 0.85) 100%)"
      : "linear-gradient(135deg, rgba(139, 69, 19, 0.90) 0%, rgba(255, 140, 0, 0.85) 25%, rgba(255, 69, 0, 0.88) 50%, rgba(220, 20, 60, 0.90) 75%, rgba(139, 69, 19, 0.95) 100%)"
    : mode === "light"
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 25%, rgba(248, 250, 252, 0.80) 50%, rgba(241, 245, 249, 0.70) 75%, rgba(255, 255, 255, 0.85) 100%)"
    : "linear-gradient(135deg, rgba(45, 27, 78, 0.90) 0%, rgba(35, 20, 60, 0.85) 25%, rgba(25, 15, 45, 0.90) 50%, rgba(30, 18, 55, 0.80) 75%, rgba(45, 27, 78, 0.90) 100%)";

  const getScoreColor = () => {
    if (wrongMoves === 0) return theme.palette.success.main;
    if (wrongMoves <= 3) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getStarsColor = () => {
    if (stars >= 3) return "#FFD700";
    if (stars >= 2) return theme.palette.warning.main;
    return theme.palette.grey[400];
  };

  const StatItem = ({
    icon,
    label,
    value,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: `${color}20`,
          border: `1px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: "0.7rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: color,
            fontSize: "0.85rem",
            textShadow: isMonsterLevel ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        ...position,
        zIndex: 1000,
        width: "200px",
        backgroundImage: overlayGradient,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isMonsterLevel ? `2px solid ${monsterColor}60` : `1px solid ${theme.palette.primary.main}30`,
        borderRadius: 3,
        p: 2,
        boxShadow: isMonsterLevel
          ? `0 0 20px ${glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
          : mode === "light"
          ? `0 8px 32px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
          : `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
        ...(isMonsterLevel && {
          animation: "monsterOverlayGlow 2s ease-in-out infinite alternate",
          "@keyframes monsterOverlayGlow": {
            "0%": {
              boxShadow: `0 0 20px ${glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4)`,
            },
            "100%": {
              boxShadow: `0 0 30px ${glowColor}, 0 12px 40px rgba(0, 0, 0, 0.6)`,
            },
          },
        }),
      }}
    >
      {isMonsterLevel && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: -5,
              right: 10,
              width: "12px",
              height: "16px",
              background: "linear-gradient(45deg, #FF4500, #FFD700, #FF6347)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.7,
              filter: "blur(1px)",
              animation: "flicker 2s ease-in-out infinite alternate",
              "@keyframes flicker": {
                "0%": { opacity: 0.5, transform: "scale(1) rotate(-2deg)" },
                "50%": { opacity: 0.9, transform: "scale(1.1) rotate(1deg)" },
                "100%": { opacity: 0.7, transform: "scale(1.05) rotate(-1deg)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -3,
              left: 15,
              width: "10px",
              height: "14px",
              background: "linear-gradient(45deg, #FF6347, #FF4500, #FFD700)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.6,
              filter: "blur(1px)",
              animation: "flicker 1.8s ease-in-out infinite alternate-reverse",
            }}
          />
        </>
      )}

      <Stack spacing={1.5}>
        <Box textAlign="center">
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              color: isMonsterLevel ? monsterColor : theme.palette.primary.main,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              textShadow: isMonsterLevel ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
              ...(isMonsterLevel && {
                background: `linear-gradient(135deg, ${monsterColor}, #FFD700)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }),
            }}
          >
            {isMonsterLevel ? "Monster Stats" : "Game Stats"}
          </Typography>
        </Box>

        <Stack spacing={1}>
          <StatItem
            icon={<Error sx={{ fontSize: 14 }} />}
            label="Wrong"
            value={wrongMoves}
            color={theme.palette.error.main}
          />
          <StatItem icon={<Timer sx={{ fontSize: 14 }} />} label="Time" value={time} color={theme.palette.info.main} />
          <StatItem
            icon={<EmojiEvents sx={{ fontSize: 14 }} />}
            label="Score"
            value={score}
            color={getScoreColor()}
          />
          <StatItem icon={<Star sx={{ fontSize: 14 }} />} label="Stars" value={`${stars}/3`} color={getStarsColor()} />
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            mt: 1,
            p: 1,
            borderRadius: 2,
            backgroundColor: isMonsterLevel
              ? `${monsterColor}10`
              : mode === "light"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 0, 0, 0.3)",
            border: `1px solid ${isMonsterLevel ? monsterColor : theme.palette.primary.main}20`,
          }}
        >
          {Array.from({ length: 3 }, (_, i) => (
            <Star
              key={i}
              sx={{
                fontSize: 16,
                color: i < stars ? "#FFD700" : theme.palette.grey[400],
                filter: i < stars ? "drop-shadow(0 0 4px #FFD700)" : "none",
                transition: "all 0.3s ease",
                ...(isMonsterLevel &&
                  i < stars && {
                    animation: `starTwinkle ${1 + i * 0.2}s ease-in-out infinite alternate`,
                    "@keyframes starTwinkle": {
                      "0%": { opacity: 0.8, transform: "scale(1)" },
                      "100%": { opacity: 1, transform: "scale(1.1)" },
                    },
                  }),
              }}
            />
          ))}
        </Box>

        <Box textAlign="center">
          <Chip
            label={
              wrongMoves === 0 ? "Perfect!" : wrongMoves <= 3 ? "Great!" : wrongMoves <= 6 ? "Good" : "Keep Trying!"
            }
            size="small"
            sx={{
              fontSize: "0.7rem",
              height: 20,
              backgroundColor: getScoreColor() + "20",
              color: getScoreColor(),
              border: `1px solid ${getScoreColor()}40`,
              fontWeight: 600,
              ...(isMonsterLevel && {
                background: `linear-gradient(135deg, ${monsterColor}30, #FFD70030)`,
                border: `1px solid ${monsterColor}60`,
                color: isMonsterLevel ? monsterColor : getScoreColor(),
              }),
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
