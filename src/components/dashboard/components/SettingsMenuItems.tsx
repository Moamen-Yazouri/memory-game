import { GameThemeContext } from "@/providers/theme/themeContext";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
interface IProps {
    icon: React.ReactNode
    title: string
    subtitle: string
    action: React.ReactNode
    iconColor: string
}
const SettingsMenuItem = ({
    icon,
    title,
    subtitle,
    action,
    iconColor,
  }: IProps) => {
    const {mode} = useContext(GameThemeContext);
    return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundImage:
          mode === "light"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.75) 100%)"
            : "linear-gradient(135deg, rgba(45, 27, 78, 0.8) 0%, rgba(26, 15, 46, 0.6) 50%, rgba(15, 5, 31, 0.75) 100%)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: `1px solid ${mode === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(139, 92, 246, 0.2)"}`,
        boxShadow: mode === "light" ? "0 4px 16px rgba(99, 102, 241, 0.1)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundImage:
            mode === "light"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.85) 100%)"
              : "linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 15, 46, 0.7) 50%, rgba(15, 5, 31, 0.85) 100%)",
          transform: "translateX(4px)",
          boxShadow: mode === "light" ? "0 6px 20px rgba(99, 102, 241, 0.15)" : "0 6px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: iconColor + "15",
              color: iconColor,
              width: 40,
              height: 40,
              border: `2px solid ${iconColor}30`,
              boxShadow: `0 4px 12px ${iconColor}20`,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>
        {action}
      </Stack>
    </Box>
  )
}
export default SettingsMenuItem;