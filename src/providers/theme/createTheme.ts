import { createTheme } from "@mui/material/styles";
import type { ThemeModes } from "../../@types";
import { getBackgroundGradient, getCardGradient } from "@/components/select-game/utils/getGradients";

export const getTheme = (mode: ThemeModes) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#8b5cf6",      // Vibrant purple for main actions
        light: "#a78bfa",     // Light purple for hover states
        dark: "#7c3aed",      // Dark purple for pressed states
      },
      secondary: {
        main: "#06b6d4",      // Cyan - perfect complement to purple
        light: "#22d3ee",     // Light cyan for highlights
        dark: "#0891b2",      // Dark cyan for emphasis
      },
      background: {
        default: mode === "light" ? "#faf7ff" : "#1a0f2e",
        paper: mode === "light" ? "#ffffff" : "#2d1b4e",
      },
      success: {
        main: "#10b981",      // Green for matched pairs
        light: "#34d399",
        dark: "#059669",
      },
      error: {
        main: "#ef4444",      // Red for mismatches
        light: "#f87171",
        dark: "#dc2626",
      },
      warning: {
        main: "#fbbf24",      // Golden yellow for hints/timer
        light: "#fcd34d",
        dark: "#f59e0b",
      },
      info: {
        main: "#06b6d4",      // Cyan for information (matches secondary)
        light: "#22d3ee",
        dark: "#0891b2",
      },
      text: {
        primary: mode === "light" ? "#1f2937" : "#f3f4f6",
        secondary: mode === "light" ? "#6b7280" : "#d1d5db",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            overflowY: "scroll",
            backgroundImage: getCardGradient(mode),
            backgroundBlendMode: "overlay",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          },
        },
      },
    },
  });