import GameBoard from "@/components/game-board/gameBoard";
import GameLoader from "@/components/loader/loader";
import { Suspense } from "react";

const GamePlayPage = () => {
  return (
    <Suspense fallback={<GameLoader/>}>
      <GameBoard />
    </Suspense>
  );
}

export default GamePlayPage;