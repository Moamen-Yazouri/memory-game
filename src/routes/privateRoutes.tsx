import {RouteObject} from "react-router-dom";
import GuardedRoutes from "./GuardedRoutes";
import { lazy } from "react";
import MonsterGame from "@/components/monster-card/monsterGame";
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
            path: "monster-level",
            element: <MonsterGame />
        },
        {
            path: "mode-selection",
            element: <SelectMode />
        },  
    ]
}