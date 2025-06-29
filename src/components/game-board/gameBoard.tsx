import { Box, Grid } from "@mui/material";
import GameCard from "../game-card/gameCard";
import { useMemo } from "react";
import { generateColumns } from "./utils/createTheCardsColumns";
import { LevelsTypes } from "@/@types";
import { getBoardLenght } from "./utils/getTheBoardLength";
interface IProps {
  level: LevelsTypes,
}


const GameBoard = (props: IProps) => {
  const cards = useMemo(() => {
      return getBoardLenght(props.level);
  }, [props.level]);

  const array: number[] = useMemo(() => {
      return Array.from({ length: cards * 2 }, (_, index) => 
          index % 2 === 0 ? index + 1 : index + 2
      ).sort(() => (Math.random() - 0.5));
  }, [cards]);

  const columns = useMemo (() => {
      return generateColumns(props.level)
  }, [props.level])
  return (
    <Box sx={{display: "flex", alignItems:"center", justifyContent:"center", minHeight: "100vh"}}>
      <Grid container spacing= {2} columns={columns} width={600}>
        {array.map((value, index) => (
          <Grid key={index} size={1} sx={{display: "flex", alignItems:"center", justifyContent:"center",}}>
            <GameCard value={value}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameBoard;
