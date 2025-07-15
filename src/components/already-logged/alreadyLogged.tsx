import { useContext, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { LockOutlined, ArrowForward, Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "@/providers/auth/authContext";

export default function AlreadyAuthenticated() {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = getAuth();
  const {logout} = useContext(AuthContext);
  const location = useLocation();
  const from: string = location.state?.from || "/"; 

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate("/sign-in"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          {
            from === "/sign-in" 
            ? "You’re already signed in. No need to access the login page"
            : "You’re already signed in. No need to access the sign-up page"
          }
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
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: `${theme.palette.error.main}08`,
                borderColor: theme.palette.error.dark,
              },
              transition: "all 0.3s ease",
            }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
