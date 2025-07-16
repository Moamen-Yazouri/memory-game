import GameBoard from "@/components/game-board/gameBoard";
import GameLoader from "@/components/loader/loader";
import routeHOC from "@/routes/HOCs/routeHOC";
import { Suspense } from "react";

const GamePlayPage = () => {
  return (
    <Suspense fallback={<GameLoader/>}>
      <GameBoard />
    </Suspense>
  );
}

const withHOC = routeHOC({
  title: "Memory Game | Game Play",
});
export default withHOC(GamePlayPage);