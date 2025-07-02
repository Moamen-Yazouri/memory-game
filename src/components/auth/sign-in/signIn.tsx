import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
} from "@mui/material";

export default function SignInForm() {
  const theme = useTheme();

  const gradient =
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #ddd6fe 100%)"
      : "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)";

  
  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          backgroundImage: gradient,
          backdropFilter: "blur(10px)",
          border:
            theme.palette.mode === "light"
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.3)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(139, 92, 246, 0.15)"
              : "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="text.primary">
          Sign In
        </Typography>

        <Box sx={{ mt: 2 }}>

          <SignInForm />

        </Box>
      </Paper>
    </Container>
  );
}
