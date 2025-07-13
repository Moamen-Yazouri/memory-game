import { GameModesTypes } from "@/@types"
import { Favorite, School, Event, LocationOn, SportsEsports } from "@mui/icons-material"

export const getModeIcon = (gameMode: GameModesTypes): React.ReactNode => {
    const icons = {
      education: <School sx={{ fontSize: 20 }} />,
      emotional: <Favorite sx={{ fontSize: 20 }} />,
      events: <Event sx={{ fontSize: 20 }} />,
      states: <LocationOn sx={{ fontSize: 20 }} />,
    }
    return icons[gameMode] || <SportsEsports sx={{ fontSize: 20 }} />
}