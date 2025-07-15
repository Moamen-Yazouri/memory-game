
import { useContext, useMemo } from "react"
import { Box, Typography, Container, Paper, Button } from "@mui/material"
import { ErrorOutline, Refresh } from "@mui/icons-material"
import { GameThemeContext } from "@/providers/theme/themeContext"

interface ErrorFallbackProps {
  message: string
  handleRetry: () => void
}

export default function ErrorFallback({
message,
  handleRetry,
}: ErrorFallbackProps) {
  const {theme, mode} = useContext(GameThemeContext)
  console.log(mode)
  const gradient = useMemo(
    () =>
      mode === "light"
        ? "linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%)"
        : "linear-gradient(135deg, #4c1d1d 0%, #7f1d1d 50%, #991b1b 100%)",
    [],
  )

  

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundImage: gradient,
          backdropFilter: "blur(10px)",
          border:
            theme.palette.mode === "light" ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(239, 68, 68, 0.3)",
          boxShadow:
            theme.palette.mode === "light" ? "0 8px 32px rgba(239, 68, 68, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <ErrorOutline
            sx={{
              fontSize: 64,
              color: theme.palette.mode === "light" ? "error.main" : "error.light",
              mb: 2,
            }}
          />

          <Typography variant="h5" gutterBottom color="text.primary" sx={{ fontWeight: 600 }}>
             Oops! Something went wrong 😢
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {message}
          </Typography>

          
            <Paper
              sx={{
                p: 2,
                mt: 2,
                backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.3)",
                border:
                  theme.palette.mode === "light"
                    ? "1px solid rgba(239, 68, 68, 0.1)"
                    : "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  wordBreak: "break-word",
                }}
              >
                {message}
              </Typography>
            </Paper>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleRetry}
            startIcon={<Refresh />}
            sx={{
              backgroundColor: theme.palette.mode === "light" ? "error.main" : "error.dark",
              "&:hover": {
                backgroundColor: theme.palette.mode === "light" ? "error.dark" : "error.main",
              },
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Try Again
          </Button>

          <Button
            variant="outlined"
            onClick={() => (window.location.href = "/")}
            sx={{
              borderColor: theme.palette.mode === "light" ? "error.main" : "error.light",
              color: theme.palette.mode === "light" ? "error.main" : "error.light",
              "&:hover": {
                borderColor: theme.palette.mode === "light" ? "error.dark" : "error.main",
                backgroundColor: theme.palette.mode === "light" ? "rgba(239, 68, 68, 0.04)" : "rgba(239, 68, 68, 0.08)",
              },
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
