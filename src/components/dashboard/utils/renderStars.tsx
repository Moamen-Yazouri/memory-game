import { Star } from "@mui/icons-material";
import { Theme } from "@mui/material";

export const renderStars = (stars: number, theme: Theme) =>
    Array.from({ length: 3 }, (_, i) => (
      <Star key={i} sx={{ fontSize: 16, color: i < stars ? theme.palette.warning.main : theme.palette.grey[400] }} />
));