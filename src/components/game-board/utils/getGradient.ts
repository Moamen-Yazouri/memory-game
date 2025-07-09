import { ThemeModes } from "@/@types"

export const getGradients = (mode: ThemeModes) => {
  const isLight = mode === "light";
  const gradient = isLight
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
    : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)";
  
  return gradient;
}

export const getShadows = (mode: ThemeModes) => {
  const isLight = mode === "light";
  const shadows = {
    light: {
      flip: "0 12px 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      hover: "0 8px 25px rgba(99, 102, 241, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
      normal: "0 4px 16px rgba(99, 102, 241, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    },
    dark: {
      flip: "0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      hover: "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      normal: "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
    }
  };
  return isLight ? shadows.light : shadows.dark;
}