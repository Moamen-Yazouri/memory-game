export const getBgGradients = (mode: "light" | "dark") => (
    mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.12) 25%, rgba(241, 245, 249, 0.18) 50%, rgba(248, 250, 252, 0.10) 75%, rgba(255, 255, 255, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(15, 8, 25, 0.85) 0%, rgba(20, 12, 35, 0.90) 25%, rgba(25, 15, 45, 0.80) 50%, rgba(18, 10, 30, 0.88) 75%, rgba(15, 8, 25, 0.85) 100%)"
)
export const getCardBg = (mode: "light" | "dark") => (
  mode === "light"
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
    : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)"
)
export const getSidebarBg = (mode: "light" | "dark") => (
  mode === "light"
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.92) 25%, rgba(241, 245, 249, 0.96) 50%, rgba(236, 242, 248, 0.88) 75%, rgba(255, 255, 255, 0.98) 100%)"
    : "linear-gradient(135deg, rgba(45, 27, 78, 0.98) 0%, rgba(35, 20, 60, 0.92) 25%, rgba(25, 15, 45, 0.96) 50%, rgba(30, 18, 55, 0.88) 75%, rgba(45, 27, 78, 0.98) 100%)"
)