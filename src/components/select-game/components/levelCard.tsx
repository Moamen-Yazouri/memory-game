import { GameModesTypes, LevelsTypes } from "@/@types";
import { IGameLevel } from "../types";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useContext, useMemo } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { CheckCircle, Lock } from "@mui/icons-material";
import { getLevelDetails } from "../utils/getLevelDetails";
import { PlayerInfoContext } from "@/providers/player-info/playerInfoContext";
import MemoryCardWithOverlay from "./levelInfo";

export interface IProps {
    level: IGameLevel;
    selectedMode: GameModesTypes;
    isLevelUnlocked: (mode: GameModesTypes, level: LevelsTypes) => boolean;
    isLevelCompleted: (mode: GameModesTypes, level: LevelsTypes) => boolean;
    handleLevelSelect: (level: LevelsTypes) => void,
}

const LevelCard = ({
        level,
        selectedMode,
        isLevelUnlocked,
        isLevelCompleted,
        handleLevelSelect,
    }: IProps) => {
    const {mode, theme} = useContext(GameThemeContext);
    const {playerState} = useContext(PlayerInfoContext);
    const isUnlocked = selectedMode ? isLevelUnlocked(selectedMode, level.id) : false;
    const isCompleted = selectedMode ? isLevelCompleted(selectedMode, level.id) : false;
      const cardGradient = useMemo(() => (
      mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(248, 250, 252, 0.90) 50%, rgba(241, 245, 249, 0.80) 75%, rgba(255, 255, 255, 0.95) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(35, 20, 60, 0.90) 25%, rgba(25, 15, 45, 0.95) 50%, rgba(30, 18, 55, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)"

  ), [mode]);

    const details = useMemo(() => {
      if(isCompleted) {
        const finished = playerState.finished.get(selectedMode);
        const levelDetails = getLevelDetails(level.id, finished!);
        return levelDetails;
      }
      else {
        return null;
      }
    }, [isCompleted]);

      
     const Notoverlayed = 
     <Box
        onClick={() => isUnlocked && handleLevelSelect(level.id)}
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "250px" },
          height: "160px",
          borderRadius: 3,
          cursor: isUnlocked ? "pointer" : "not-allowed",
          backgroundImage: cardGradient,
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: `1px solid ${isUnlocked ? level.color + "30" : theme.palette.grey[400] + "20"}`,
          boxShadow: isUnlocked ? `0 8px 32px ${level.color}15` : `0 4px 16px ${theme.palette.grey[400]}10`,
          opacity: isUnlocked ? 1 : 0.6,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": isUnlocked
            ? {
                transform: "scale(1.05) translateY(-4px)",
                boxShadow: `0 12px 40px ${level.color}25`,
              }
            : {},
        }}
      >
        <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
          {isCompleted ? (
            <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 24 }} />
          ) : !isUnlocked ? (
            <Lock sx={{ color: theme.palette.grey[400], fontSize: 24 }} />
          ) : null}
        </Box>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            textAlign: "center",
          }}
        >
          <Chip
            label={level.name}
            sx={{
              backgroundColor: isUnlocked ? level.color : theme.palette.grey[400],
              color: "white",
              fontWeight: 600,
              mb: 2,
              fontSize: "1rem",
              px: 2,
              py: 1,
              height: "auto",
            }}
          />
          <Typography variant="body1" fontWeight={500} color="text.primary" mb={1}>
            {level.cards}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {level.description}
          </Typography>
        </Box>
      </Box>
      if(isCompleted) {
        
        return (
          <MemoryCardWithOverlay {...details!}>
            {Notoverlayed}
          </MemoryCardWithOverlay>
        )
      }
      else {
        return (Notoverlayed);
      }
}

export default LevelCard;