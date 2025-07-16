"use client";

import { useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { LockOutlined, ArrowForward, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function AlreadyAuthenticated() {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = getAuth();

  const gradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.8) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 15, 46, 0.8) 50%, rgba(15, 5, 31, 0.9) 100%)",
    [theme]
  );

  const handleGoToApp = () => {
    navigate("/memory-game/dashboard");
  };

  

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundImage: gradient,
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.primary.main}30`,
          boxShadow:
            theme.palette.mode === "light"
              ? `0 12px 40px ${theme.palette.primary.main}20`
              : `0 12px 40px rgba(0, 0, 0, 0.6)`,
          textAlign: "center",
          maxWidth: 450,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: `${theme.palette.primary.main}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${theme.palette.primary.main}30`,
            }}
          >
            <LockOutlined
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
            Already Logged In
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            lineHeight: 1.6,
            fontSize: "1.1rem",
          }}
        >
          You’re already signed in. No need to access the login page.
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowForward />}
            onClick={handleGoToApp}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
              },
              transition: "all 0.3s ease",
            }}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Menu/>}
            onClick={() => navigate("/memory-game/mode-selection")}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}60`,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(255, 255, 255, 0.1)",
                boxShadow: `0 0 12px ${theme.palette.primary.main}40`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Main Menu
          </Button>

        </Stack>
      </Paper>
    </Container>
  );
}
