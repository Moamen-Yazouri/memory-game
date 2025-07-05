import { GameModesTypes, LevelsTypes } from "@/@types";
import { createContext, useEffect, useReducer, useState } from "react";
import { initialContext, initialGame } from "./constants";
import { Action, IState, reducer } from "@/states/game-state/reducer";
import { INITIAL_STATE } from "@/states/game-state/constants";

export interface IGameInfo {
    mode: GameModesTypes | null;
    level: LevelsTypes | null;
}

export interface IGameInfoContext {
    gameInfo: IGameInfo;
    state: IState,
    dispatch: React.ActionDispatch<[action: Action]>
    changeLevel: (level: LevelsTypes) => void;
    changeMode: (mode: GameModesTypes) => void;
}

interface IProps {
    children: React.ReactNode
}

export const GameInfoContext = createContext<IGameInfoContext>(initialContext);

export const GameProvider = (props: IProps) => {
    const [gameInfo, setGameInfo] = useState<IGameInfo>(initialGame);
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect (() => {
        if(gameInfo.level && gameInfo.mode) {

            dispatch({type: "INITIAL_GAME", payload: gameInfo.level})
        }
    }, [gameInfo]);


    const changeMode = (mode: GameModesTypes) => {
        setGameInfo((prev) => ({...prev, mode: mode}))
    }

    const changeLevel = (level: LevelsTypes) => {
        setGameInfo((prev) => ({...prev, level: level}))
    }

    const value: IGameInfoContext = {
        state,
        gameInfo,
        dispatch, 
        changeLevel,
        changeMode,
    }
    return  <GameInfoContext.Provider value={value}>
                {props.children}
            </GameInfoContext.Provider>
}