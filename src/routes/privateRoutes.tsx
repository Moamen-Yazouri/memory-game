import {RouteObject} from "react-router-dom";
import GuardedRoutes from "./GuardedRoutes";
import { lazy } from "react";
const Dashboard = lazy(() => import("@/pages/dashboard"));
const GamePlay = lazy(() => import("@/pages/gamePlay"));
const SelectMode = lazy(() => import("@/pages/selectMode"));


export const privateRoutes: RouteObject = {
    path: "/memory-game",
    element: <GuardedRoutes/>,
    children: [
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "game-play",
            element: <GamePlay />
        },
        {
            path: "mode-selection",
            element: <SelectMode />
        },  
    ]
}