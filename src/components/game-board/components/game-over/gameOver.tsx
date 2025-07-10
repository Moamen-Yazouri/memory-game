import { 
    Box, 
    Typography, 
    Paper, 
    useTheme, 
    Stack, 
    Button, 
    Modal, 
    Backdrop, 
    IconButton 
} from "@mui/material";
import { 
    SentimentVeryDissatisfied, 
    Refresh, 
    Home, 
    Close, 
    TrendingDown, 
    Timer, 
    Error 
} from "@mui/icons-material";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { GameModesTypes, LevelsTypes } from "@/@types";

interface IProps {
  open: boolean
  onRetry: () => void
  score: number
  timeElapsed: number
  wrongMoves: number
  level: LevelsTypes
  mode: GameModesTypes
}

export default function GameOverModal({
  open,
  onRetry,
  score,
  timeElapsed,
  wrongMoves,
  level,
  mode 
}: IProps) {
  const {theme} = useContext(GameThemeContext)
  const navigate = useNavigate();
  const isLight = theme.palette.mode === "light"

  const gradient = useMemo(() => (
    isLight
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)"
  ), [mode])

  const backdropGradient = useMemo(() => (isLight ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.7)"), [isLight])

  const handleMainMenu = () => {
    navigate("/memory-game/mode-selection");
  }


  return (
    <Modal
      open={open}
      onClose={handleMainMenu}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: backdropGradient,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        },
      }}
    >
      <Box
        sx={{
          outline: "none",
          animation: open ? "modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          "@keyframes modalSlideIn": {
            "0%": {
              opacity: 0,
              transform: "scale(0.8) translateY(-50px)",
            },
            "100%": {
              opacity: 1,
              transform: "scale(1) translateY(0)",
            },
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            width: { xs: "90vw", sm: "400px" },
            maxWidth: "400px",
            backgroundImage: gradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${theme.palette.error.main}25`,
            borderRadius: 4,
            p: 3,
            boxShadow:
              theme.palette.mode === "light"
                ? `0 20px 60px ${theme.palette.error.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : `0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <IconButton
            onClick={handleMainMenu}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: theme.palette.text.secondary,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: theme.palette.error.main + "15",
                color: theme.palette.error.main,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              zIndex: 1,
            }}
            size="small"
          >
            <Close sx={{ fontSize: 18 }} />
          </IconButton>

          <Stack spacing={3} alignItems="center">
        
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundImage: gradient,
                backdropFilter: "blur(20px)",
                border: `2px solid ${theme.palette.error.main}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${theme.palette.error.main}30`,
                animation: "shake 1s ease-in-out",
                "@keyframes shake": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "25%": { transform: "translateX(-5px)" },
                  "75%": { transform: "translateX(5px)" },
                },
              }}
            >
              <SentimentVeryDissatisfied
                sx={{
                  fontSize: 35,
                  color: theme.palette.error.main,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </Box>

            <Stack spacing={1} textAlign="center">
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Game Over
              </Typography>

              <Typography variant="body1" color="text.secondary" fontWeight={500}>
                Better luck next time!
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {level} • {mode}
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                width: "100%",
                mt: 1,
              }}
            >
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.warning.main + "15",
                    border: `1px solid ${theme.palette.warning.main}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <TrendingDown sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Score
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {score.toLocaleString()}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.info.main + "15",
                    border: `1px solid ${theme.palette.info.main}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <Timer sx={{ fontSize: 16, color: theme.palette.info.main }} />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Time
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {timeElapsed}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.error.main + "15",
                    border: `1px solid ${theme.palette.error.main}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 0.5,
                  }}
                >
                  <Error sx={{ fontSize: 16, color: theme.palette.error.main }} />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Mistakes
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {wrongMoves}
                </Typography>
              </Box>
            </Box>
Q
            <Stack direction="row" spacing={2} sx={{ width: "100%", mt: 2 }}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<Refresh />}
                onClick={onRetry}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
                  border: `1px solid ${theme.palette.primary.main}50`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px ${theme.palette.primary.main}50`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<Home />}
                onClick={handleMainMenu}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundImage: gradient,
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${theme.palette.text.secondary}40`,
                  color: theme.palette.text.primary,
                  boxShadow: `0 4px 16px rgba(0, 0, 0, 0.1)`,
                  "&:hover": {
                    backgroundColor: theme.palette.text.secondary + "10",
                    borderColor: theme.palette.text.secondary,
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 20px rgba(0, 0, 0, 0.15)`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Main Menu
              </Button>
            </Stack>

            <Box
              sx={{
                backgroundImage: gradient,
                backdropFilter: "blur(15px)",
                border: `1px solid ${theme.palette.info.main}20`,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                width: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                💪 Don't give up! Every mistake is a step closer to mastery.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  )
}
