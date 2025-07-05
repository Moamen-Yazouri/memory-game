import { GameModesTypes, LevelsTypes } from "@/@types";
import { GameInfoContext } from "@/providers/game-info/gameInfo";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectGame = () => {
  const [gMode, setGMode] = useState<GameModesTypes | null>(null);
  const [gLevel, setGLevel] = useState<LevelsTypes | null>(null);
  const {changeLevel, changeMode} = useContext(GameInfoContext);
  const nav = useNavigate();
  useEffect(() => {
      if(gMode) {
        changeMode(gMode);
      }

      if(gLevel) {
        changeLevel(gLevel);
      }

      if(gLevel && gMode) {
        nav("/memory-game/game-play");
      }
      return;
  }, [gMode, gLevel])
  return (
    <>
      {
        !gMode 
        ? (
          <div className="h-100 flex items-center justify-center flex-col gap-5">
            <h1 className="text-4xl">Select The Mode</h1>
            <ul className="flex items-center justify-center gap-2">
              <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                <button onClick={() => setGMode("education")} className="cursor-pointer">Education</button>
              </li>
              <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                <button onClick={() => setGMode("emotional")} className="cursor-pointer">Emotional</button>
              </li>
              <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                <button onClick={() => setGMode("events")} className="cursor-pointer">Events</button>
              </li>
              <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                <button onClick={() => setGMode("states")} className="cursor-pointer">States</button>
              </li>
            </ul>
          </div>
        )
        : (
            <div className="h-100 flex items-center justify-center flex-col gap-5">
              <h1 className="text-4xl">Select The Mode</h1>
              <ul className="flex items-center justify-center gap-2">
                <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                  <button onClick={() => setGLevel("easy")} className="cursor-pointer">Easy</button>
                </li>
                <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                  <button onClick={() => setGLevel("medium")} className="cursor-pointer">Medium</button>
                </li>
                <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                  <button onClick={() => setGLevel("hard")} className="cursor-pointer">Hard</button>
                </li>
                <li className="bg-[#d3d3d3] text-black p-2 hover:scale-[1.1] transition">
                  <button onClick={() => setGLevel("veryHard")} className="cursor-pointer">Very Hard</button>
                </li>
              </ul>

              <button className="bg-[#22d3ee] p-2 text-black cursor-pointer" onClick={() => setGMode(null)}>Change Mode</button>
            </div>
        )
      }
    </>
  )
}

export default SelectGame;