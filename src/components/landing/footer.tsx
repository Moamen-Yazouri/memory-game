import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material"
import { useContext } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"
import { Mail, GitHub, LinkedIn, Phone } from "@mui/icons-material"

interface GameFooterProps {
  creatorName?: string
  linkedinUrl?: string
  githubUrl?: string
  email?: string
  whatsappNumber?: string
}

export default function GameFooter({
  creatorName = "Moamen Al-Yazouri",
  linkedinUrl = "https://www.linkedin.com/in/moamen-al-yazouri-80742433a/",
  githubUrl = "https://github.com/Moamen-Yazouri",
  email = "moaamenalyazouri@gmail.com",
  whatsappNumber = "+970567709710",
}: GameFooterProps) {
  const { theme, mode } = useContext(GameThemeContext)

  const glassStyle =
    mode === "dark"
      ? {
          background: `
            linear-gradient(135deg, 
              rgba(45, 27, 78, 0.25) 0%,
              rgba(26, 15, 46, 0.35) 25%,
              rgba(139, 92, 246, 0.15) 50%,
              rgba(6, 182, 212, 0.1) 75%,
              rgba(45, 27, 78, 0.25) 100%
            )`,
          backdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(139, 92, 246, 0.2)`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(139, 92, 246, 0.1)
          `,
        }
      : {
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.4) 0%,
              rgba(250, 247, 255, 0.6) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              rgba(6, 182, 212, 0.08) 75%,
              rgba(255, 255, 255, 0.4) 100%
            )`,
          backdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(255, 255, 255, 0.3)`,
          boxShadow: `
            0 8px 32px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 0 1px rgba(139, 92, 246, 0.1)
          `,
        }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedIn fontSize="small" />,
      url: linkedinUrl,
      color: "#0077B5",
    },
    {
      name: "GitHub",
      icon: <GitHub fontSize="small" />,
      url: githubUrl,
      color: mode === "dark" ? "#FFF" : "#333",
    },
    {
      name: "Email",
      icon: <Mail fontSize="small" />,
      url: `mailto:${email}`,
      color: "#EA4335",
    },
    {
      name: "WhatsApp",
      icon: <Phone fontSize="small" />,
      url: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      color: "#25D366",
    },
  ]

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        ...glassStyle,
        flex: 1,
        display: "flex",
        alignItems: "center",
        maxHeight: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 2, sm: 0 }}
        sx={{flex: 1}}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: mode === "dark" ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none",
          }}
        >
          Created with 💜 by {creatorName}
        </Typography>

        <Stack direction="row" spacing={1}>
          {socialLinks.map((link) => (
            <Tooltip key={link.name} title={link.name} arrow placement="top">
              <IconButton
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={link.name}
                sx={{
                  color: link.color,
                  backgroundColor: `${link.color}15`,
                  border: `1px solid ${link.color}30`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: `${link.color}25`,
                    transform: "translateY(-3px)",
                    boxShadow: `0 4px 12px ${link.color}40`,
                  },
                }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
