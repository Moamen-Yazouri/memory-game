import { 
    GameModesTypes,  
    ICurrent, 
    IFinishedLevel, 
    IMonster
} from "@/@types";
import { 
    createContext, 
    useEffect, 
    useReducer, 
    useRef 
} from "react";
import { 
    INITIAL_CONTEXT_STATE, 
    initialPlayer 
} from "./constants";
import { 
    getDatabase, 
    ref, 
    set 
} from "firebase/database";
import playerInfoService from "./service/playerInfo.service";
import { formatFinishedForDB } from "./utils/formatRealtimeDB";
import { 
    Action, 
    IState, 
    reducer 
} from "@/reducers/player-state/reducer";
import authService from "@/service/auth.service";


export interface IPlayerInfo {
    currentInfo: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}

export interface IPlayerInfoContext {
    playerState: IState;
    playerDispatch: React.ActionDispatch<[action: Action]>
}

export const PlayerInfoContext = createContext<IPlayerInfoContext>(INITIAL_CONTEXT_STATE);


interface IProps {
    children: React.ReactNode;
}

export const PlayerInfoProvider = (props: IProps) => {
    const [playerState, playerDispatch] = useReducer(reducer, initialPlayer)
    const initialized = useRef<boolean>(false);
    const id = useRef<string>(null);
    console.log(playerState);
    useEffect(() => {
        if(initialized.current) {
            return;
        }

        const initializeUser = async () => {
            try {
                const user = await authService.getLoggedUser();
                if(user) {      
                    id.current = user.uid;        
                    const info = await playerInfoService.getPlayerInfo(id.current);
                    if(info) {
                        console.log("initialized")
                        playerDispatch({type: "INITIAL_INFO", payload: info});
                    }
                    initialized.current = true;
                }
            }
            catch(e) {
                console.error(e);
            }
            
        }

        initializeUser();
    }, []);

    useEffect(() => {
        if(!initialized.current || !id.current) {
            return;
        }
        const updateDB = async () => {
            const db = getDatabase();
            const infoForDB = {
                ...playerState,
                finished: formatFinishedForDB(playerState.finished)
            } 
            const playerInfoRef = ref(db, `users/${id.current}/playerInfo`);
            try {
                await set(playerInfoRef, infoForDB);
                console.log("Synced");
            }
            catch(e) {
                console.error(e);
            }
        }

        updateDB();

    }, [playerState]);

    
    const value: IPlayerInfoContext = {
        playerState,
        playerDispatch
    }; 

    return  <PlayerInfoContext.Provider value={value}>
                {props.children}
            </PlayerInfoContext.Provider>
}
