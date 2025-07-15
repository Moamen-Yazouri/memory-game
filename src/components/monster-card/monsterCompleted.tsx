import { 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Stack, 
    Button, 
    Divider, 
    Chip, 
    Avatar 
} from "@mui/material";
import { Timer, Dashboard, Refresh, EmojiEvents, Error, Psychology, Whatshot } from "@mui/icons-material"
import { useContext, useMemo } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"
import { useNavigate } from "react-router-dom"
import { GameInfoContext } from "@/providers/game-info/gameInfo"

interface IProps {
  score: number,
  time: number,
  wrongMoves: number,
  isNewRecord: boolean,
}

export default function MonsterLevelCompleted({ score , time, wrongMoves, isNewRecord }: IProps) {
  const { theme } = useContext(GameThemeContext);
  const {gameDispatch, gameState} = useContext(GameInfoContext);
  const navigate = useNavigate();

  const backgroundGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(255, 140, 0, 0.12) 25%, rgba(255, 69, 0, 0.18) 50%, rgba(220, 20, 60, 0.10) 75%, rgba(139, 69, 19, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(139, 69, 19, 0.85) 0%, rgba(255, 140, 0, 0.90) 25%, rgba(255, 69, 0, 0.80) 50%, rgba(220, 20, 60, 0.88) 75%, rgba(139, 69, 19, 0.85) 100%)",
    [theme],
  )

  const cardGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme],
  )

  const monsterColor = "#FF4500"
  const glowColor = "rgba(255, 69, 0, 0.6)"

  const handleDashboard = () => {
    navigate("/memory-game/dashboard")
  }

  const handleChangeMode = () => {
    gameDispatch({type: "RESET_GAME"});
    navigate("/memory-game/mode-selection");
  }

  const handlePlayAgain = () => {
    gameDispatch({type: "RESTART_GAME", payload: {level: "monster", mode: null}});
  }
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/monster.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            backgroundImage: cardGradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `3px solid ${monsterColor}`,
            borderRadius: 4,
            p: 3,
            boxShadow: `0 0 50px ${glowColor}, 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `conic-gradient(from 0deg, transparent, ${monsterColor}20, transparent)`,
              animation: "rotate 6s linear infinite",
              zIndex: -1,
            },
            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Monster Success Icon */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundImage: cardGradient,
                backdropFilter: "blur(20px)",
                border: `3px solid ${monsterColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)`,
                position: "relative",
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    boxShadow: `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)`,
                  },
                  "50%": {
                    boxShadow: `0 0 50px ${glowColor}, 0 12px 40px rgba(0,0,0,0.4)`,
                  },
                },
              }}
            >
              <Psychology
                sx={{
                  fontSize: 40,
                  color: monsterColor,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  zIndex: 1,
                }}
              />
              <Whatshot
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  fontSize: 24,
                  color: "#FFD700",
                  zIndex: 2,
                  filter: "drop-shadow(0 0 8px #FFD700)",
                  animation: "flicker 1.5s ease-in-out infinite alternate",
                  "@keyframes flicker": {
                    "0%": { opacity: 0.8, transform: "scale(1) rotate(-2deg)" },
                    "50%": { opacity: 1, transform: "scale(1.1) rotate(1deg)" },
                    "100%": { opacity: 0.9, transform: "scale(1.05) rotate(-1deg)" },
                  },
                }}
              />
            </Box>

            <Stack spacing={2} textAlign="center" sx={{ width: "100%" }}>
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  background: `linear-gradient(135deg, ${monsterColor} 0%, #FFD700 50%, ${monsterColor} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  animation: "shimmer 3s ease-in-out infinite alternate",
                  "@keyframes shimmer": {
                    "0%": { filter: "hue-rotate(0deg)" },
                    "100%": { filter: "hue-rotate(20deg)" },
                  },
                }}
              >
                🎉 MONSTER CONQUERED! 🎉
              </Typography>

              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  color: monsterColor,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  mb: 1,
                }}
              >
                Ultimate Challenge Completed!
              </Typography>

              <Box
                sx={{
                  background: `linear-gradient(135deg, ${monsterColor}20, #FFD70020)`,
                  border: `2px solid ${monsterColor}40`,
                  borderRadius: 3,
                  p: 2,
                  backdropFilter: "blur(15px)",
                  boxShadow: `0 4px 16px ${monsterColor}30`,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    color: theme.palette.mode === "light" ? monsterColor : "#FFFFFF",
                    textAlign: "center",
                    textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  🏆 CONGRATULATIONS! 🏆
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.mode === "light" ? theme.palette.text.primary : "rgba(255,255,255,0.9)",
                    textAlign: "center",
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  You have successfully completed the entire Memory Game!
                  <br />
                  You are now a true Memory Master! 🧠✨
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${monsterColor} 0%, #FFD700 50%, ${monsterColor} 100%)`,
                  border: `3px solid #FFD700`,
                  boxShadow: `0 8px 32px ${monsterColor}40`,
                  animation: "glow 2s ease-in-out infinite alternate",
                  "@keyframes glow": {
                    "0%": { boxShadow: `0 8px 32px ${monsterColor}40` },
                    "100%": { boxShadow: `0 12px 40px ${monsterColor}60` },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="white"
                  sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  MONSTER LEVEL
                </Typography>
                <Chip
                  label="MASTERED"
                  size="small"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: monsterColor,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    height: "auto",
                    py: 0.5,
                    px: 1,
                  }}
                />
              </Box>
            </Stack>

            
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.warning.main + "15",
                    color: theme.palette.warning.main,
                    width: 36,
                    height: 36,
                    mx: "auto",
                    mb: 0.5,
                    border: `2px solid ${theme.palette.warning.main}40`,
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Final Score
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {score.toLocaleString()}
                </Typography>
                {isNewRecord && (
                  <Chip
                    label="RECORD!"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.65rem",
                      backgroundColor: "#FFD700",
                      color: monsterColor,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  />
                )}
              </Box>

              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.info.main + "15",
                    color: theme.palette.info.main,
                    width: 36,
                    height: 36,
                    mx: "auto",
                    mb: 0.5,
                    border: `2px solid ${theme.palette.info.main}40`,
                  }}
                >
                  <Timer sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Time
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {time}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.error.main + "15",
                    color: theme.palette.error.main,
                    width: 36,
                    height: 36,
                    mx: "auto",
                    mb: 0.5,
                    border: `2px solid ${theme.palette.error.main}40`,
                  }}
                >
                  <Error sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="caption" color="text.secondary" display="block">
                  Mistakes
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {wrongMoves}
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                width: "100%",
                background: `linear-gradient(90deg, transparent, ${monsterColor}50, transparent)`,
              }}
            />

            {/* Action Buttons */}
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<Refresh />}
                onClick={handlePlayAgain}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${monsterColor} 0%, #FFD700 100%)`,
                  boxShadow: `0 6px 20px ${monsterColor}40`,
                  border: `2px solid #FFD700`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.error.dark} 0%, #FFA500 100%)`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px ${monsterColor}50`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Play Again
              </Button>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<Dashboard />}
                onClick={handleDashboard}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundImage: cardGradient,
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${theme.palette.info.main}40`,
                  color: theme.palette.info.main,
                  "&:hover": {
                    backgroundColor: theme.palette.info.main + "15",
                    transform: "translateY(-1px)",
                    borderColor: theme.palette.info.main,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Dashboard
              </Button>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<Refresh />}
                onClick={handleChangeMode}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundImage: cardGradient,
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${theme.palette.warning.main}40`,
                  color: theme.palette.warning.main,
                  "&:hover": {
                    backgroundColor: theme.palette.warning.main + "15",
                    transform: "translateY(-1px)",
                    borderColor: theme.palette.warning.main,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                New Game
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
