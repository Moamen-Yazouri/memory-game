import { CompletedDB,  GameModesTypes,  ICurrent, IFinishedLevel, IMonster } from "@/@types";
import { createContext, useEffect, useState } from "react";
import { INITIAL_CONTEXT_STATE, INITIAL_FOR_DB } from "./constants";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";


export interface IPlayerInfo {
    current: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}

export interface IPlayerInfoContext {
    playerInfo: IPlayerInfo;
}

export const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


interface IProps {
    children: React.ReactNode;
}

export const PlayerInfoProvider = (props: IProps) => {
    const [playerInfo, setPlayerInfo] = useState<IPlayerInfo>(INITIAL_CONTEXT_STATE.playerInfo);
    useEffect(() => {
        const authConnect = onAuthStateChanged(auth, async (user: User | null) => {
            if(!user) {
                return; 
            }
            const id = user.uid;
            const db = getDatabase();

            const playerInfoRef = ref(db, `users/${id}/playerInfo`);
            console.log(INITIAL_FOR_DB);
            await set(playerInfoRef, INITIAL_FOR_DB);
        });

        return () => authConnect();
    });
    
    const value: IPlayerInfoContext = {playerInfo: playerInfo}; 

    return <PlayerInfoContext.Provider value={value}>
            {props.children}
    </PlayerInfoContext.Provider>
}
