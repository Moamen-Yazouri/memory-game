import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

const GameCard = () => {
  const theme = useTheme();

  const gradient =
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgb(204, 188, 222), rgb(186, 171, 192))"
      : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)";

  const shadow =
    theme.palette.mode === "light"
      ? "0 2px 8px rgba(0,0,0,0.08)"
      : "0 0 6px rgba(108, 53, 184, 0.25), 0 0 3px rgba(108, 53, 184, 0.15)";

  const hoverShadow =
    theme.palette.mode === "light"
      ? "0 4px 12px rgba(0,0,0,0.15)"
      : "0 0 10px rgba(155, 98, 255, 0.4), 0 0 5px rgba(155, 98, 255, 0.25)";

  return (
    <Card
      sx={{
        width: "fit-content",
        borderRadius: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: shadow,
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: hoverShadow,
        },
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            width: 100,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: gradient,
            borderRadius: 2,
          }}
        >
          {/* Content goes here */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
