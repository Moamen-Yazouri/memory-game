import { GameThemeContext } from "@/providers/theme/themeContext"
import Paper from "@mui/material/Paper"
import { useContext, useMemo } from "react"
import { getBgGradients } from "../utils/getGradients"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"

export const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
  }: {
    title: string
    value: string | number
    subtitle?: string
    icon: React.ReactNode
    iconColor: string
  }) => {
    const {theme, mode} = useContext(GameThemeContext);
    const cardBg = useMemo(() => getBgGradients(mode), [mode]);
    return (
        <Paper
        elevation={0}
        sx={{
            p: 3,
            borderRadius: 3,
            backgroundImage: cardBg,
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            border: `1px solid ${theme.palette.primary.main}20`,
            boxShadow:
            mode === "light"
                ? `0 12px 40px ${theme.palette.primary.main}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
            transform: "translateY(-4px) scale(1.02)",
            boxShadow:
                mode === "light"
                ? `0 16px 50px ${theme.palette.primary.main}25, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                : `0 16px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
            },
        }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                {title}
                </Typography>
                <Avatar
                sx={{
                    bgcolor: iconColor + "15",
                    color: iconColor,
                    width: 32,
                    height: 32,
                    border: `2px solid ${iconColor}30`,
                    boxShadow: `0 4px 12px ${iconColor}25`,
                }}
                >
                {icon}
                </Avatar>
            </Box>
            <Typography variant="h4" fontWeight={600}>
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="caption" color="text.secondary">
                {subtitle}
                </Typography>
            )}
        </Paper>
    )
  }