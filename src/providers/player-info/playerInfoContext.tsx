import { CompletedDB,  GameModesTypes,  ICurrent, IFinishedLevel, IMonster, LevelsTypes } from "@/@types";
import { createContext, useEffect, useRef, useState } from "react";
import { INITIAL_CONTEXT_STATE, INITIAL_FOR_DB } from "./constants";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";
import playerInfoService from "./service/playerInfo.service";
import { finished } from "stream";
import { formatFinishedForDB } from "./utils/formatRealtimeDB";


export interface IPlayerInfo {
    current: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}

export interface IPlayerInfoContext {
    playerInfo: IPlayerInfo;
    setCurrent: (mode: GameModesTypes, level: LevelsTypes) => void,
    addFinished: (mode: GameModesTypes, levelInfo: IFinishedLevel) => void,
}

export const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


interface IProps {
    children: React.ReactNode;
}

export const PlayerInfoProvider = (props: IProps) => {
    const [playerInfo, setPlayerInfo] = useState<IPlayerInfo>(INITIAL_CONTEXT_STATE.playerInfo);
    const initialized = useRef<boolean>(false);
    const id = useRef<string>(null);
    const setCurrent = (mode: GameModesTypes, level: LevelsTypes) => {
        setPlayerInfo((prev) => ({...prev, current: {...prev.current, modeName: mode, level}}));
    }

    const addFinished = (mode: GameModesTypes, levelInfo: IFinishedLevel) => {
        const lastFinished = playerInfo.finished.get(mode) || [];

        const newFinished = structuredClone(playerInfo.finished);
        newFinished.set(mode, [...lastFinished, levelInfo]);

        setPlayerInfo((prev) => ({...prev, finished: newFinished}));
    }

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (logged) => {
                    if(logged?.uid) {
                        id.current = logged.uid;
                        if(!initialized.current) {
            
                            playerInfoService.getPlayerInfo(id.current)
                            .then(
                                (data) => {
                                    if(data) {
                                        setPlayerInfo(data);
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
                ...playerInfo,
                finished: formatFinishedForDB(playerInfo.finished)
            } 
            const playerInfoRef = ref(db, `users/${id}/playerInfo`);
            
            set(playerInfoRef, infoForDB)
            .then(() => console.log("Synced"))
            .catch(() => console.log("error"));

    }, [playerInfo]);
    
    const value: IPlayerInfoContext = {
        playerInfo,
        setCurrent,
        addFinished,
    }; 

    return <PlayerInfoContext.Provider value={value}>
            {props.children}
    </PlayerInfoContext.Provider>
}
