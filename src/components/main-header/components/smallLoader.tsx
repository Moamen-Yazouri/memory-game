import { GameThemeContext } from "@/providers/theme/themeContext";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
interface IProps {
  isSignIn?: boolean,
}
const SmallLoader = (props: IProps) => {
  const { theme, mode } = useContext(GameThemeContext)

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: 3,
        backgroundImage: 
          !props.isSignIn ?
          mode === "light"
            ? "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.75))"
            : "linear-gradient(135deg, rgba(45,27,78,0.75), rgba(25,15,45,0.70))"

            : "",
        backdropFilter: "blur(15px)",
        border: `1px solid ${theme.palette.primary.main}20`,
        boxShadow: `0 2px 8px ${theme.palette.primary.main}10`,
      }}
    >
      <CircularProgress
        size={20}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
    </Box>
  )
}
export default SmallLoader;