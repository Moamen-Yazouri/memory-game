import { GameModesTypes,  ICurrent, IFinishedLevel, IMonster} from "@/@types";
import { createContext, useEffect, useReducer, useRef } from "react";
import { INITIAL_CONTEXT_STATE, initialPlayer } from "./constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";
import playerInfoService from "./service/playerInfo.service";
import { formatFinishedForDB } from "./utils/formatRealtimeDB";
import { Action, IState, reducer } from "@/reducers/player-state/reducer";


export interface IPlayerInfo {
    currentInfo: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}

export interface IPlayerInfoContext {
    state: IState;
    dispatch: React.ActionDispatch<[action: Action]>
}

export const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


interface IProps {
    children: React.ReactNode;
}

export const PlayerInfoProvider = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialPlayer)
    const initialized = useRef<boolean>(false);
    const id = useRef<string>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (logged) => {
                if(logged?.uid) {
                    id.current = logged.uid;
                    if(!initialized.current) {
        
                        playerInfoService.getPlayerInfo(id.current)
                        .then(
                            (data) => {
                                if(data) {
                                    dispatch({type: "INITIAL_INFO", payload: data})
                                }
                            }
                        );
                    }
                    return;
                }
            }        
        );

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if(!initialized.current || !id.current) {
            initialized.current = true;
            return;
        }
            
        const db = getDatabase();
        const infoForDB = {
            ...state,
            finished: formatFinishedForDB(state.finished)
        } 
        const playerInfoRef = ref(db, `users/${id}/playerInfo`);
        
        set(playerInfoRef, infoForDB)
        .then(() => console.log("Synced"))
        .catch(() => console.log("error"));

    }, [state]);
    
    const value: IPlayerInfoContext = {
        state,
        dispatch
    }; 

    return <PlayerInfoContext.Provider value={value}>
            {props.children}
    </PlayerInfoContext.Provider>
}
