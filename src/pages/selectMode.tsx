import GameLoader from "@/components/loader/loader";
import SelectGame from "@/components/select-game/selectGame";
import routeHOC from "@/routes/HOCs/routeHOC";
import { Suspense } from "react";

const SelectModePage = () => {
  return (
    <Suspense fallback={<GameLoader/>}>
      <SelectGame /> 
    </Suspense>
  )
}
const withHOC = routeHOC({
  title: "Memory Game | Select Game",
});
export default withHOC(SelectModePage);