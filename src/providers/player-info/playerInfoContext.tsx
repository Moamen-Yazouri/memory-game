import { CompletedDB,  GameModesTypes,  ICurrent, IFinishedLevel, IMonster, LevelsTypes } from "@/@types";
import { createContext, useEffect, useRef, useState } from "react";
import { INITIAL_CONTEXT_STATE, INITIAL_FOR_DB } from "./constants";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";
import playerInfoService from "./service/playerInfo.service";


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
        const authConnect = onAuthStateChanged(auth, (user: User | null) => {

            if(!user) {
                return; 
            }
            
            if(!initialized.current) {

                initialized.current = true;

                playerInfoService.getPlayerInfo(user.uid)
                .then(
                    (data) => {
                        if(data) {
                            setPlayerInfo(data);
                        }
                    }
                );
                
            }
            const id = user.uid;
            const db = getDatabase();
            
            const playerInfoRef = ref(db, `users/${id}/playerInfo`);
    
            set(playerInfoRef, INITIAL_FOR_DB)
            .then(() => console.log("Synced"))
            .catch(() => console.log("error"))
        });

        return () => authConnect();
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
