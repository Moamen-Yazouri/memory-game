import { Box, Card, Grid } from "@mui/material";
import GameCard from "../game-card/gameCard";

const GameBoard = () => {
  return (
    <Box sx={{display: "flex", alignItems:"center", justifyContent:"center", minHeight: "100vh"}}>


      <Grid container spacing= {3} columns={3} width={350}>
        {Array.from(Array(12)).map((_, index) => (
          <Grid key={index} size={1} sx={{display: "flex", alignItems:"center", justifyContent:"center",}}>
            <GameCard/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameBoard;
