"use client"

import { Box, Typography, Chip } from "@mui/material"
import { Lock, LockOpen, Psychology, Whatshot } from "@mui/icons-material"
import { useMemo, useContext } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"

interface MonsterLevelCardProps {
  onMonsterSelect?: () => void
  backgroundImage?: string
  isUnlocked?: boolean
}

export default function MonsterLevelCard({
  onMonsterSelect,
  backgroundImage = "/monster.png",
  isUnlocked = false,
}: MonsterLevelCardProps) {
  const { theme, mode } = useContext(GameThemeContext)

  const cardGradient = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [mode],
  )

  const overlayGradient = useMemo(
    () =>
      isUnlocked
        ? mode === "light"
          ? "linear-gradient(135deg, rgba(139, 69, 19, 0.85) 0%, rgba(255, 140, 0, 0.75) 25%, rgba(255, 69, 0, 0.80) 50%, rgba(220, 20, 60, 0.85) 75%, rgba(139, 69, 19, 0.90) 100%)"
          : "linear-gradient(135deg, rgba(139, 69, 19, 0.90) 0%, rgba(255, 140, 0, 0.85) 25%, rgba(255, 69, 0, 0.88) 50%, rgba(220, 20, 60, 0.90) 75%, rgba(139, 69, 19, 0.95) 100%)"
        : mode === "light"
          ? "linear-gradient(135deg, rgba(105, 105, 105, 0.85) 0%, rgba(128, 128, 128, 0.80) 25%, rgba(169, 169, 169, 0.75) 50%, rgba(105, 105, 105, 0.85) 75%, rgba(128, 128, 128, 0.90) 100%)"
          : "linear-gradient(135deg, rgba(105, 105, 105, 0.90) 0%, rgba(128, 128, 128, 0.85) 25%, rgba(169, 169, 169, 0.80) 50%, rgba(105, 105, 105, 0.90) 75%, rgba(128, 128, 128, 0.95) 100%)",
    [isUnlocked, mode],
  )

  const monsterColor = isUnlocked ? "#FF4500" : theme.palette.grey[500]
  const glowColor = isUnlocked ? "rgba(255, 69, 0, 0.6)" : "rgba(128, 128, 128, 0.3)"

  const handleClick = () => {
    if (isUnlocked && onMonsterSelect) {
      onMonsterSelect()
    }
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        width: { xs: "100%", sm: "350px" },
        height: "250px",
        borderRadius: 4,
        overflow: "hidden",
        cursor: isUnlocked ? "pointer" : "not-allowed",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: isUnlocked ? 1 : 0.7,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        border: `3px solid ${monsterColor}`,
        boxShadow: isUnlocked ? `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)` : `0 4px 16px rgba(0,0,0,0.2)`,
        "&:hover": isUnlocked
          ? {
              transform: "scale(1.05) translateY(-8px) rotateX(5deg)",
              boxShadow: `0 0 50px ${glowColor}, 0 20px 60px rgba(0,0,0,0.4)`,
              "& .monster-overlay": {
                background: overlayGradient.replace(/0\.\d+/g, (match) =>
                  String(Math.min(Number.parseFloat(match) + 0.1, 1)),
                ),
              },
              "& .monster-glow": {
                opacity: 1,
                transform: "scale(1.2)",
              },
              "& .monster-flames": {
                opacity: 1,
                animation: "flicker 1.5s ease-in-out infinite alternate",
              },
            }
          : {
              transform: "scale(1.02)",
            },
        "@keyframes flicker": {
          "0%": { opacity: 0.8, transform: "scale(1) rotate(-2deg)" },
          "50%": { opacity: 1, transform: "scale(1.1) rotate(1deg)" },
          "100%": { opacity: 0.9, transform: "scale(1.05) rotate(-1deg)" },
        },
        "@keyframes pulse": {
          "0%, 100%": {
            boxShadow: `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)`,
          },
          "50%": {
            boxShadow: `0 0 50px ${glowColor}, 0 12px 40px rgba(0,0,0,0.4)`,
          },
        },
        animation: isUnlocked ? "pulse 3s ease-in-out infinite" : "none",
      }}
    >
      {/* Background Overlay */}
      <Box
        className="monster-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: overlayGradient,
          zIndex: 1,
          transition: "all 0.3s ease",
        }}
      />

      {/* Glow Effect */}
      {isUnlocked && (
        <Box
          className="monster-glow"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            opacity: 0.6,
            zIndex: 2,
            transition: "all 0.4s ease",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Flame Effects */}
      {isUnlocked && (
        <>
          <Box
            className="monster-flames"
            sx={{
              position: "absolute",
              top: "10%",
              right: "15%",
              width: "30px",
              height: "40px",
              background: "linear-gradient(45deg, #FF4500, #FFD700, #FF6347)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.8,
              zIndex: 3,
              filter: "blur(2px)",
              animation: "flicker 2s ease-in-out infinite alternate",
            }}
          />
          <Box
            className="monster-flames"
            sx={{
              position: "absolute",
              bottom: "15%",
              left: "20%",
              width: "25px",
              height: "35px",
              background: "linear-gradient(45deg, #FF6347, #FF4500, #FFD700)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.7,
              zIndex: 3,
              filter: "blur(1px)",
              animation: "flicker 1.8s ease-in-out infinite alternate-reverse",
            }}
          />
        </>
      )}

      {/* Glass overlay for content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: cardGradient,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${monsterColor}30`,
          zIndex: 4,
          opacity: 0.3,
        }}
      />

      {/* Lock Status Indicator */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: isUnlocked ? `${monsterColor}20` : `${theme.palette.grey[500]}20`,
          border: `3px solid ${isUnlocked ? monsterColor : theme.palette.grey[500]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(10px)",
          boxShadow: isUnlocked ? `0 4px 16px ${monsterColor}40` : `0 4px 16px ${theme.palette.grey[500]}20`,
          animation: isUnlocked ? "pulse 2s ease-in-out infinite" : "none",
        }}
      >
        {isUnlocked ? (
          <LockOpen
            sx={{
              color: monsterColor,
              fontSize: 24,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          />
        ) : (
          <Lock
            sx={{
              color: theme.palette.grey[500],
              fontSize: 24,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          textAlign: "center",
        }}
      >
        {/* Monster Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: isUnlocked ? `${monsterColor}25` : `${theme.palette.grey[500]}20`,
            border: `3px solid ${isUnlocked ? monsterColor : theme.palette.grey[500]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            color: isUnlocked ? monsterColor : theme.palette.grey[500],
            boxShadow: isUnlocked
              ? `0 8px 32px ${monsterColor}40, inset 0 2px 8px rgba(255,255,255,0.2)`
              : `0 4px 16px ${theme.palette.grey[500]}20`,
            backdropFilter: "blur(15px)",
            position: "relative",
            overflow: "hidden",
            "&::before": isUnlocked
              ? {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `conic-gradient(from 0deg, transparent, ${monsterColor}40, transparent)`,
                  borderRadius: "50%",
                  animation: "rotate 3s linear infinite",
                }
              : {},
            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          <Psychology sx={{ fontSize: 40, zIndex: 1 }} />
          {isUnlocked && (
            <Whatshot
              sx={{
                position: "absolute",
                top: -5,
                right: -5,
                fontSize: 20,
                color: "#FFD700",
                zIndex: 2,
                filter: "drop-shadow(0 0 8px #FFD700)",
              }}
            />
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: isUnlocked ? "#FFFFFF" : theme.palette.grey[400],
            mb: 1,
            textShadow: isUnlocked
              ? "0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,69,0,0.5)"
              : "0 2px 4px rgba(0,0,0,0.5)",
            background: isUnlocked ? `linear-gradient(45deg, ${monsterColor}, #FFD700, ${monsterColor})` : "none",
            backgroundClip: isUnlocked ? "text" : "none",
            WebkitBackgroundClip: isUnlocked ? "text" : "none",
            WebkitTextFillColor: isUnlocked ? "transparent" : "inherit",
            animation: isUnlocked ? "shimmer 2s ease-in-out infinite alternate" : "none",
            "@keyframes shimmer": {
              "0%": { filter: "hue-rotate(0deg)" },
              "100%": { filter: "hue-rotate(20deg)" },
            },
          }}
        >
          Monster Level
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: isUnlocked ? "rgba(255,255,255,0.9)" : theme.palette.grey[500],
            mb: 2,
            fontWeight: 500,
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          {isUnlocked ? "Ultimate Challenge Awaits" : "Locked - Complete other modes"}
        </Typography>

        {/* Status Chip */}
        <Chip
          label={isUnlocked ? "UNLOCKED" : "LOCKED"}
          size="small"
          sx={{
            backgroundColor: isUnlocked ? monsterColor : theme.palette.grey[500],
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.75rem",
            px: 1,
            py: 0.5,
            height: "auto",
            boxShadow: isUnlocked ? `0 4px 16px ${monsterColor}50` : `0 2px 8px ${theme.palette.grey[500]}30`,
            border: `2px solid ${isUnlocked ? "#FFD700" : "transparent"}`,
            animation: isUnlocked ? "glow 2s ease-in-out infinite alternate" : "none",
            "@keyframes glow": {
              "0%": { boxShadow: `0 4px 16px ${monsterColor}50` },
              "100%": { boxShadow: `0 6px 24px ${monsterColor}70` },
            },
          }}
        />

        {/* Difficulty Indicator */}
        {isUnlocked && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.5,
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#FFD700",
                  boxShadow: "0 0 8px #FFD700",
                  animation: `twinkle ${1 + i * 0.2}s ease-in-out infinite alternate`,
                  "@keyframes twinkle": {
                    "0%": { opacity: 0.5, transform: "scale(0.8)" },
                    "100%": { opacity: 1, transform: "scale(1.2)" },
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
