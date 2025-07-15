import { use, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import SignUpForm from "./signUpForm";
import authService from "@/service/auth.service";
import { Navigate, useNavigate } from "react-router-dom";

const getUser = authService.getLoggedUser();

export default function SignUp() {
  const theme = useTheme();
  const user = use(getUser);
  const navigate = useNavigate();
  const gradient = useMemo(() => (
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #ddd6fe 100%)"
      : "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)"
  ), [theme]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <Navigate
          to={"/already-logged"}
          replace
          state={{ from: location.pathname }}
        />
      ) : (
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundImage: gradient,
            backdropFilter: "blur(10px)",
            border: theme.palette.mode === "light"
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: theme.palette.mode === "light"
              ? "0 8px 32px rgba(139, 92, 246, 0.15)"
              : "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
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
          </Box>

          <Typography variant="h5" align="center" gutterBottom color="text.primary">
            Sign Up
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            <SignUpForm />
          </Box>
          <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  textDecoration: "underline",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Already have an account?
              </Typography>
            </Box>
        </Paper>
      )}
    </Container>
  );
}
