import { CompletedDB,  ICurrent, IMonster } from "@/@types";
import { createContext } from "react";
import { INITIAL_CONTEXT_STATE } from "./constants";

export interface IPlayerInfoContext {
    current: ICurrent,
    finished: CompletedDB,
    monster: IMonster ,
}

const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


