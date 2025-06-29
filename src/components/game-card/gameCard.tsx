
import { useCallback, useState } from "react";
import { Card, CardContent, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface IProps {
  value: number;
}

const GameCard = ({ value }: IProps) => {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const gradient =
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgb(204, 188, 222), rgb(186, 171, 192))"
      : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)";

    const getShadow = useCallback(
      (isFlipping: boolean) => {
        if (theme.palette.mode === "light") {
          return isFlipping
            ? "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)"
            : isHovered
              ? "0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)"
              : "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)";
        } 
        else {
          return isFlipping
            ? "0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(108, 53, 184, 0.3)"
            : isHovered
              ? "0 6px 20px rgba(0,0,0,0.3), 0 3px 10px rgba(108, 53, 184, 0.25)"
              : "0 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(108, 53, 184, 0.15)";
        }
       
    }, [isHovered, theme.palette.mode]);

  return (
    <Box
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: isMobile ? "28vw" : "120px",
        height: isMobile ? "20vh" : "120px",
        perspective: "1000px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        transform: isHovered && !flipped ? "translateY(-2px)" : "translateY(0px)",
        maxWidth: 150,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          boxShadow: getShadow(flipped),
          borderRadius: 2,
        }}
      >
        {/* Front */}
        <Card
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            borderRadius: 2,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.1)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 1,
            },
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: gradient,
              borderRadius: 2,
              fontSize: isMobile ? "1.8rem" : "2rem",
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            ❓
          </CardContent>
        </Card>

        {/* Back */}
        <Card
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            borderRadius: 2,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "1.8rem" : "2rem",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.mode === "light"
                ? "rgba(204, 188, 222, 0.1)"
                : "rgba(108, 53, 184, 0.1)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            },
            transition: "transform 0.3s ease",
            "& > *": {
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          {value}
        </Card>
      </Box>
    </Box>
  );
};

export default GameCard;
