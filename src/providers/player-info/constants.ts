import { GameModesTypes, IFinishedLevel } from "@/@types";
import { IPlayerInfo, IPlayerInfoContext } from "./playerInfoContext";
import { formatFinishedForDB } from "./utils/formatRealtimeDB";
const initialMap: Map<GameModesTypes, IFinishedLevel[]> = new Map([ 
        ["education", [{level: "medium",
        score: 95,
        time: 18,
        wrongMoves: 1
        },
        {        
        level: "easy",
        score: 80,
        time: 12,
        wrongMoves: 2}
    ]],
        ["emotional", []],
        ["events", []],
        ["states", []],
])
export const initialPlayer: IPlayerInfo = {
    current: {
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

export const INITIAL_CONTEXT_STATE: IPlayerInfoContext = {playerInfo: initialPlayer};

export const INITIAL_FOR_DB = {
    current: initialPlayer.current,
    finished: formatFinishedForDB(initialPlayer.finished),
    monster: initialPlayer.monster,
}