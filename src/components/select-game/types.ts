import { GameModesTypes, LevelsTypes } from "@/@types";
import { ReactNode } from "react";

export interface IGameLevel {
    id: LevelsTypes,
    name:string,
    description:string,
    cards:string,
    color: string
}

export interface IGameMode {
    id: GameModesTypes,
    name:string,
    description:string,
    icon: ReactNode,
    bgImage: string,
    color: string,
}
