import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";
import {
  PlayArrow,
} from "@mui/icons-material";
import { useContext, useMemo } from "react";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { theme, mode } = useContext(GameThemeContext);
  const navigate = useNavigate();

  const cardGradient = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(26, 15, 46, 0.9) 25%, rgba(15, 5, 31, 0.95) 50%, rgba(88, 28, 135, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)",
    [theme]
  );

  const handleGetStarted = () => {
    navigate("/sign-up");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            backgroundImage: cardGradient,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${theme.palette.primary.main}20`,
            borderRadius: 6,
            p: { xs: 3, md: 6 }, 
            boxShadow:
              mode === "light"
                ? `0 20px 60px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255,255,255,0.3)`
                : `0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`,
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                mode === "light"
                  ? `0 25px 80px ${theme.palette.primary.main}25, inset 0 1px 0 rgba(255,255,255,0.4)`
                  : `0 25px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15)`,
            },
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundImage: cardGradient,
                backdropFilter: "blur(20px)",
                border: `2px solid ${theme.palette.primary.main}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${theme.palette.primary.main}25`,
                overflow: "hidden", 
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>


            <Stack spacing={2}>
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.warning.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", md: "3rem" }, 
                  lineHeight: 1.2,
                }}
              >
                Memory Game
              </Typography>

              <Typography
                variant="h5"
                color="text.primary"
                fontWeight={500}
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.3rem" }, 
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                Challenge your mind with our exciting memory card game
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" }, 
                  maxWidth: "400px", 
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Test your memory skills, compete with friends, and unlock achievements in this beautifully designed card matching game.
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={handleGetStarted}
              sx={{
                py: 1.5, 
                px: 3, 
                borderRadius: 4,
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
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ mt: 3, opacity: 0.8 }} 
              divider={
                <Box
                  sx={{
                    width: { xs: "100%", sm: "1px" },
                    height: { xs: "1px", sm: "20px" },
                    background: `linear-gradient(90deg, transparent, ${theme.palette.text.secondary}30, transparent)`,
                  }}
                />
              }
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                🧠 Train Your Memory
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                🏆 Unlock Achievements
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                📊 Track Progress
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>

      
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: { xs: 30, sm: 40, md: 50 },
          height: { xs: 30, sm: 40, md: 50 },
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`,
          backdropFilter: "blur(10px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-12px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          right: "15%",
          width: { xs: 25, sm: 30, md: 40 },
          height: { xs: 25, sm: 30, md: 40 },
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.warning.main}20, ${theme.palette.error.main}15)`,
          backdropFilter: "blur(10px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "5%",
          width: { xs: 20, sm: 25, md: 30 },
          height: { xs: 20, sm: 25, md: 30 },
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.success.main}20, ${theme.palette.info.main}15)`,
          backdropFilter: "blur(10px)",
          animation: "float 10s ease-in-out infinite",
        }}
      />
    </Box>
  );
}