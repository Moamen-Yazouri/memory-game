import GameLoader from "@/components/loader/loader";
import SelectGame from "@/components/select-game/selectGame";
import { Suspense } from "react";

const SelectModePage = () => {
  return (
    <Suspense fallback={<GameLoader/>}>
      <SelectGame /> 
    </Suspense>
  )
}

export default SelectModePage;