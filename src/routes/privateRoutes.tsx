import {RouteObject} from "react-router-dom";
import GuardedRoutes from "./GuardedRoutes";
import Dashboard from "@/pages/dashboard";
import GamePlay from "@/pages/gamePlay";
import SelectMode from "@/pages/selectMode";

const privateRoutes: RouteObject = {
    path: "memory-game",
    element: <GuardedRoutes/>,
    children: [
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
            path: "/game-play",
            element: <GamePlay />
        },
        {
            path: "mode-selection",
            element: <SelectMode />
        },  
    ]
}