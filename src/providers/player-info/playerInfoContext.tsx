import { CompletedDB,  GameModesTypes,  ICurrent, IFinishedLevel, IMonster } from "@/@types";
import { createContext } from "react";
import { INITIAL_CONTEXT_STATE } from "./constants";

export interface IPlayerInfoContext {
    current: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}

const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


interface IProvider {
    children: React.ReactNode;
}

const PlayerInfoprovider = () => {
    
}
