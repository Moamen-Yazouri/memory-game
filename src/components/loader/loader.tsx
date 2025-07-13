import { 
    Box, 
    Typography, 
    CircularProgress, 
    useTheme, 
    Stack 
} from "@mui/material";
import { SportsEsports, Memory, Psychology } from "@mui/icons-material";
import { useMemo, useEffect, useState } from "react";

interface GameLoaderProps {
  message?: string
  showProgress?: boolean
  progress?: number
  size?: "small" | "medium" | "large"
  variant?: "default" | "minimal" | "detailed"
}

export default function GameLoader({
  message = "loading...",
  showProgress = false,
  progress = 0,
  size = "medium",
  variant = "default",
}: GameLoaderProps) {
  const theme = useTheme()
  const [animationStep, setAnimationStep] = useState(0)

  const backgroundGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.12) 25%, rgba(241, 245, 249, 0.18) 50%, rgba(248, 250, 252, 0.10) 75%, rgba(255, 255, 255, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(15, 8, 25, 0.85) 0%, rgba(20, 12, 35, 0.90) 25%, rgba(25, 15, 45, 0.80) 50%, rgba(18, 10, 30, 0.88) 75%, rgba(15, 8, 25, 0.85) 100%)",
    [theme],
  )

  const cardGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          containerSize: 200,
          iconSize: 40,
          progressSize: 60,
          fontSize: "1rem",
          spacing: 2,
        }
      case "large":
        return {
          containerSize: 400,
          iconSize: 80,
          progressSize: 120,
          fontSize: "1.5rem",
          spacing: 4,
        }
      default: 
        return {
          containerSize: 300,
          iconSize: 60,
          progressSize: 80,
          fontSize: "1.2rem",
          spacing: 3,
        }
    }
  }

  const config = getSizeConfig()

  const loadingIcons = [
    {
      icon: <SportsEsports sx={{ fontSize: config.iconSize * 0.6 }} />,
      color: theme.palette.primary.main,
      label: "Game",
    },
    {
      icon: <Memory sx={{ fontSize: config.iconSize * 0.6 }} />,
      color: theme.palette.secondary.main,
      label: "Memory",
    },
    {
      icon: <Psychology sx={{ fontSize: config.iconSize * 0.6 }} />,
      color: theme.palette.warning.main,
      label: "Brain",
    },
  ]

  if (variant === "minimal") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: backgroundGradient,
          backgroundAttachment: "fixed",
          zIndex: 9999,
        }}
      >
        <CircularProgress
          size={config.progressSize}
          thickness={3}
          sx={{
            color: theme.palette.primary.main,
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
      </Box>
    )
  }

  if (variant === "detailed") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: backgroundGradient,
          backgroundAttachment: "fixed",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            backgroundImage: cardGradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${theme.palette.primary.main}25`,
            borderRadius: 4,
            p: 4,
            boxShadow:
              theme.palette.mode === "light"
                ? `0 20px 60px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : `0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            textAlign: "center",
            minWidth: config.containerSize,
          }}
        >
          <Stack spacing={config.spacing} alignItems="center">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loadingIcons.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: config.iconSize,
                    height: config.iconSize,
                    borderRadius: "50%",
                    backgroundImage: cardGradient,
                    backdropFilter: "blur(20px)",
                    border: `2px solid ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    boxShadow: `0 8px 32px ${item.color}30`,
                    transform: animationStep === index ? "scale(1.2)" : "scale(1)",
                    opacity: animationStep === index ? 1 : 0.6,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: animationStep === index ? "pulse 0.8s ease-in-out" : "none",
                    "@keyframes pulse": {
                      "0%, 100%": {
                        boxShadow: `0 8px 32px ${item.color}30`,
                      },
                      "50%": {
                        boxShadow: `0 12px 40px ${item.color}50`,
                      },
                    },
                  }}
                >
                  {item.icon}
                </Box>
              ))}
            </Box>

            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
              sx={{
                fontSize: config.fontSize,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {message}
            </Typography>

            {showProgress && (
              <Box sx={{ width: "100%", maxWidth: 200 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    overflow: "hidden",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.warning.main} 100%)`,
                      borderRadius: 4,
                      transition: "width 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  {progress}% Complete
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    opacity: animationStep === index ? 1 : 0.3,
                    transform: animationStep === index ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: backgroundGradient,
        backgroundAttachment: "fixed",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundImage: cardGradient,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: `1px solid ${theme.palette.primary.main}25`,
          borderRadius: 4,
          p: config.spacing,
          boxShadow:
            theme.palette.mode === "light"
              ? `0 20px 60px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
              : `0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          textAlign: "center",
        }}
      >
        <Stack spacing={config.spacing} alignItems="center">

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size={config.progressSize}
              thickness={3}
              sx={{
                color: theme.palette.primary.main,
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: config.iconSize,
                height: config.iconSize,
                borderRadius: "50%",
                backgroundImage: cardGradient,
                backdropFilter: "blur(20px)",
                border: `2px solid ${theme.palette.primary.main}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
                animation: "rotate 2s linear infinite",
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            >
              <SportsEsports sx={{ fontSize: config.iconSize * 0.5 }} />
            </Box>
          </Box>

          
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            sx={{
              fontSize: config.fontSize,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {message}
          </Typography>

          {showProgress && (
            <Box sx={{ width: "100%", maxWidth: 200 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    borderRadius: 3,
                    transition: "width 0.3s ease",
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                {progress}%
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
