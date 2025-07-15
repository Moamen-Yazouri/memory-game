import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Button 
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material"
import LevelCard from "./components/levelCard"
import ModeCard from "./components/modeCard"
import { useSelectGame } from "./hook/useSelectGame"
import MonsterLevelCard from "../monster-card/monsterCard";




export default function SelectGame() {
  const {
    selectedMode,
    gameModes,
    levels,
    cardGradient,
    theme,
    unlockedLevels,
    setSelectedMode,
    handleModeSelect,
    handleLevelSelect,
    isLevelCompleted,
    isLevelUnlocked
  } = useSelectGame();

    
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          {!selectedMode ? (
            <>
              <Box textAlign="center" mb={4}>
                <Typography variant="h3" fontWeight={700} color="text.primary" mb={2}>
                  Select Game Mode
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Choose your preferred game category
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  maxWidth: "1000px",
                }}
              >
                {gameModes.map((mode) => (
                  <ModeCard
                    key={mode.id}
                    gameMode={mode}
                    handleModeSelect = {handleModeSelect}     
                  />
                ))}
                <MonsterLevelCard />
              </Box>
            </>
          ) : (
            <>
              <Box textAlign="center" mb={4}>
                <Typography variant="h3" fontWeight={700} color="text.primary" mb={2}>
                  Select Difficulty Level
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={3}>
                  Choose your challenge level for{" "}
                  <span style={{ color: gameModes.find((m) => m.id === selectedMode)?.color }}>
                    {gameModes.find((m) => m.id === selectedMode)?.name}
                  </span>{" "}
                  mode
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => setSelectedMode(null)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    backgroundImage: cardGradient,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.primary.main}30`,
                  }}
                >
                  Change Mode
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  maxWidth: "800px",
                }}
              >
                {levels.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={level}
                    selectedMode={selectedMode}
                    isLevelUnlocked={isLevelUnlocked}
                    isLevelCompleted={isLevelCompleted}
                    handleLevelSelect={handleLevelSelect}
                  />
                ))}
              </Box>

              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Unlocked levels: {selectedMode ? unlockedLevels[selectedMode]?.length || 0 : 0} /{" "}
                  {levels.length}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
