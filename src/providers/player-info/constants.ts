import { GameModesTypes, IFinishedLevel } from "@/@types";
import { IPlayerInfo, IPlayerInfoContext } from "./playerInfoContext";
import { formatFinishedForDB } from "./utils/formatRealtimeDB";
const initialMap: Map<GameModesTypes, IFinishedLevel[]> = new Map([ 
        ["education", []],
        ["emotional", []],
        ["events", []],
        ["states", []],
])
export const initialPlayer: IPlayerInfo = {
    currentInfo: {
        modeName: "education",
        level: "easy",
    },
    finished: initialMap,
    monster: {
        unlocked: false,
        score: 0,
        wrongMoves: 0,
        time: 0,
    }
}

export const INITIAL_CONTEXT_STATE: IPlayerInfoContext = {
    playerState: initialPlayer,
    playerDispatch: () => { },
};

export const INITIAL_FOR_DB = {
    currentInfo: initialPlayer.currentInfo,
    finished: formatFinishedForDB(initialPlayer.finished),
    monster: initialPlayer.monster,
}