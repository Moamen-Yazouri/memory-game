import { GameModesTypes } from "@/@types"
import { IGameMode } from "../types"
import { Box, Typography } from "@mui/material"
import { getCardGradient } from "../utils/getGradients"
import { useContext, useMemo } from "react"
import { GameThemeContext } from "@/providers/theme/themeContext"

interface IProps {
    gameMode: IGameMode,
    handleModeSelect: (mode: GameModesTypes) => void
}
const ModeCard = ({gameMode, handleModeSelect}: IProps) => {
    const {mode} = useContext(GameThemeContext) 
      const cardGradient = useMemo(
    () => (getCardGradient(mode))
  ,[mode]);
  return (
        <Box
      onClick={() => handleModeSelect(gameMode.id)}
      sx={{
        position: "relative",
        width: { xs: "100%", sm: "280px" },
        height: "200px",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(${gameMode.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.05) translateY(-8px)",
          boxShadow: `0 20px 60px ${gameMode.color}30`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${gameMode.color}40 0%, ${gameMode.color}20 50%, ${gameMode.color}30 100%)`,
          zIndex: 1,
        },
      }}
    >
     
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: cardGradient,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${gameMode.color}30`,
          zIndex: 2,
        }}
      />

      
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: `${gameMode.color}20`,
            border: `2px solid ${gameMode.color}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            color: gameMode.color,
            boxShadow: `0 4px 16px ${gameMode.color}30`,
          }}
        >
          {gameMode.icon}
        </Box>
        <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
          {gameMode.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gameMode.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default ModeCard