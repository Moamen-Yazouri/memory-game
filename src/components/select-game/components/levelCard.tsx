import { GameModesTypes, LevelsTypes } from "@/@types";
import { IGameLevel } from "../types";
import { GameThemeContext } from "@/providers/theme/themeContext";
import { useContext, useMemo } from "react";
import { getCardGradient } from "../utils/getGradients";
import { Box, Chip, Typography } from "@mui/material";
import { CheckCircle, Lock } from "@mui/icons-material";

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
    const isUnlocked = selectedMode ? isLevelUnlocked(selectedMode, level.id) : false
    const isCompleted = selectedMode ? isLevelCompleted(selectedMode, level.id) : false
    const cardGradient = useMemo(
        () => (getCardGradient(mode))
    ,[mode]);
    return (
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
    )
}

export default LevelCard;