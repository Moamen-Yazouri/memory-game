import { Box, Typography, Button, Container, useTheme, Stack, Paper } from "@mui/material"
import { Warning, ArrowBack, SportsEsports } from "@mui/icons-material"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"



export default function SelectionRequired() {
  const theme = useTheme()
  const navigate = useNavigate();
  const backgroundGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(129, 97, 243, 0.08) 12.5%, rgba(139, 92, 246, 0.10) 25%, rgba(154, 88, 248, 0.09) 37.5%, rgba(168, 85, 247, 0.07) 50%, rgba(202, 78, 250, 0.06) 62.5%, rgba(236, 72, 153, 0.05) 75%, rgba(219, 87, 197, 0.06) 87.5%, rgba(99, 102, 241, 0.06) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.35) 0%, rgba(38, 21, 62, 0.40) 12.5%, rgba(26, 15, 46, 0.45) 25%, rgba(20, 10, 38, 0.42) 37.5%, rgba(15, 5, 31, 0.38) 50%, rgba(35, 12, 52, 0.35) 62.5%, rgba(88, 28, 135, 0.32) 75%, rgba(66, 27, 106, 0.36) 87.5%, rgba(45, 27, 78, 0.35) 100%)",
    [theme],
  )

  const cardGradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(26, 15, 46, 0.9) 25%, rgba(15, 5, 31, 0.95) 50%, rgba(88, 28, 135, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme],
  )

  const handleGoToSelect = () => {
    
      navigate("/memeory-game/mode-selection");

    
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
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            backgroundImage: cardGradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${theme.palette.warning.main}25`,
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            textAlign: "center",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 20px 60px ${theme.palette.warning.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : `0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 25px 80px ${theme.palette.warning.main}25, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                  : `0 25px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
            },
          }}
        >
          <Stack spacing={4} alignItems="center">

            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundImage: cardGradient,
                backdropFilter: "blur(20px)",
                border: `2px solid ${theme.palette.warning.main}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${theme.palette.warning.main}30`,
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    transform: "scale(1)",
                    boxShadow: `0 8px 32px ${theme.palette.warning.main}30`,
                  },
                  "50%": {
                    transform: "scale(1.05)",
                    boxShadow: `0 12px 40px ${theme.palette.warning.main}40`,
                  },
                },
              }}
            >
              <Warning
                sx={{
                  fontSize: 40,
                  color: theme.palette.warning.main,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </Box>

            <Stack spacing={2}>
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                Selection Required
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  maxWidth: "400px",
                  mx: "auto",
                }}
              >
                You need to select both a{" "}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  game mode
                </Box>{" "}
                and{" "}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.warning.main,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  difficulty level
                </Box>{" "}
                before you can start playing.
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBack />}
              onClick={handleGoToSelect}
              sx={{
                py: 2,
                px: 4,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                border: `1px solid ${theme.palette.primary.main}50`,
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  transform: "translateY(-2px) scale(1.02)",
                  boxShadow: `0 12px 40px ${theme.palette.primary.main}50`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Go to Select Page
            </Button>

            <Box
              sx={{
                backgroundImage: cardGradient,
                backdropFilter: "blur(15px)",
                border: `1px solid ${theme.palette.info.main}20`,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                <SportsEsports
                  sx={{
                    color: theme.palette.info.main,
                    fontSize: 20,
                  }}
                />
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Choose from 4 game modes and 4 difficulty levels
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
