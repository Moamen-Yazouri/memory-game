import { GameModesTypes, LevelsTypes } from "@/@types";
import { createContext, useReducer, useState } from "react";
import { initialContext, initialGame } from "./constants";
import { Action, IState, reducer } from "@/reducers/game-state/reducer";
import { INITIAL_STATE } from "@/reducers/game-state/constants";


export interface IGameInfo {
    mode: GameModesTypes | null;
    level: LevelsTypes | null;
}

export interface IGameInfoContext {
    gameInfo: IGameInfo;
    gameState: IState,
    gameDispatch: React.ActionDispatch<[action: Action]>
    changeLevel: (level: LevelsTypes) => void;
    changeMode: (mode: GameModesTypes) => void;
}

interface IProps {
    children: React.ReactNode
}

export const GameInfoContext = createContext<IGameInfoContext>(initialContext);

export const GameProvider = (props: IProps) => {
    const [gameInfo, setGameInfo] = useState<IGameInfo>(initialGame);
    const [gameState, gameDispatch] = useReducer(reducer, INITIAL_STATE);
    

    

    const changeMode = (mode: GameModesTypes) => {
        setGameInfo((prev) => ({...prev, mode: mode}))
    }

    const changeLevel = (level: LevelsTypes) => {
        setGameInfo((prev) => ({...prev, level: level}))
    }

    const value: IGameInfoContext = {
        gameState,
        gameInfo,
        gameDispatch, 
        changeLevel,
        changeMode,
    }
    return  <GameInfoContext.Provider value={value}>
                {props.children}
            </GameInfoContext.Provider>
}