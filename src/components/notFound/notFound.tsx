import type React from "react"

import { useMemo } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material"
import {
  Home,
  ArrowBack,
  Search,
  Explore,
  DarkMode,
  LightMode,
  SentimentVeryDissatisfied,
  QuestionMark,
} from "@mui/icons-material"

interface NotFoundPageProps {
  onGoHome?: () => void
  onGoBack?: () => void
  onSearch?: (query: string) => void
  onToggleTheme?: () => void
  isDarkMode?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export default function NotFoundPage({
  onGoHome,
  onGoBack,
  onSearch,
  onToggleTheme,
  isDarkMode = false,
  searchQuery = "",
  onSearchChange,
}: NotFoundPageProps) {
  const theme = useTheme()

  const gradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.8) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 15, 46, 0.8) 50%, rgba(15, 5, 31, 0.9) 100%)",
    [theme],
  )

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
    } else {
      window.location.href = "/"
    }
  }

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack()
    } else {
      window.history.back()
    }
  }

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Theme Toggle Button */}
      {onToggleTheme && (
        <IconButton
          onClick={onToggleTheme}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.primary.main}40`,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {isDarkMode ? (
            <LightMode sx={{ color: theme.palette.primary.light }} />
          ) : (
            <DarkMode sx={{ color: theme.palette.primary.main }} />
          )}
        </IconButton>
      )}

      <Paper
        elevation={12}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundImage: gradient,
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.primary.main}30`,
          boxShadow:
            theme.palette.mode === "light"
              ? `0 12px 40px ${theme.palette.primary.main}20`
              : `0 12px 40px rgba(0, 0, 0, 0.6)`,
          textAlign: "center",
          maxWidth: 600,
          width: "100%",
        }}
      >
        {/* 404 Visual */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
                fontWeight: 900,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}
            >
              4
            </Typography>

            <Box
              sx={{
                width: { xs: 60, sm: 80, md: 100 },
                height: { xs: 60, sm: 80, md: 100 },
                borderRadius: "50%",
                backgroundColor: `${theme.palette.warning.main}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `3px solid ${theme.palette.warning.main}`,
                animation: "bounce 2s infinite",
                "@keyframes bounce": {
                  "0%, 20%, 50%, 80%, 100%": {
                    transform: "translateY(0)",
                  },
                  "40%": {
                    transform: "translateY(-10px)",
                  },
                  "60%": {
                    transform: "translateY(-5px)",
                  },
                },
              }}
            >
              <SentimentVeryDissatisfied
                sx={{
                  fontSize: { xs: 30, sm: 40, md: 50 },
                  color: theme.palette.warning.main,
                }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
                fontWeight: 900,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}
            >
              4
            </Typography>
          </Box>
        </Box>

        {/* Title and Description */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Oops! Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            lineHeight: 1.6,
            fontSize: "1.1rem",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          The page you're looking for seems to have wandered off into the digital void. Don't worry, it happens to the
          best of us!
        </Typography>

        {/* Search Box */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for what you're looking for..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    sx={{
                      minWidth: "auto",
                      px: 2,
                      borderRadius: 2,
                    }}
                  >
                    Go
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.3)",
                },
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{
              py: 1.5,
              px: 3,
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
            Go Home
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              borderWidth: 2,
              "&:hover": {
                borderColor: theme.palette.secondary.dark,
                backgroundColor: `${theme.palette.secondary.main}08`,
                transform: "translateY(-1px)",
                borderWidth: 2,
              },
              transition: "all 0.3s ease",
            }}
          >
            Go Back
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<Explore />}
            onClick={() => {
              // You can customize this to show popular pages or sitemap
              console.log("Explore clicked")
            }}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: theme.palette.text.secondary,
              color: theme.palette.text.secondary,
              "&:hover": {
                borderColor: theme.palette.text.primary,
                backgroundColor: `${theme.palette.text.secondary}08`,
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Explore
          </Button>
        </Stack>

        {/* Help Text */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "light" ? `${theme.palette.info.main}08` : `${theme.palette.info.main}15`,
            border: `1px solid ${theme.palette.info.main}30`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <QuestionMark
              sx={{
                color: theme.palette.info.main,
                mr: 1,
                fontSize: 20,
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.info.main,
                fontWeight: 600,
              }}
            >
              Need Help?
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.9rem",
            }}
          >
            If you believe this is an error, please contact our support team or check our status page for any ongoing
            issues.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
