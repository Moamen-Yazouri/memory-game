import { CompletedDB, GameModesTypes, IFinishedLevel } from "@/@types";
import { IPlayerInfo } from "../playerInfoContext";

export const getFinsihedInfo = (finished: CompletedDB): Map<GameModesTypes, IFinishedLevel[]> => {
    const finsihedMap: Map<GameModesTypes, IFinishedLevel[]> = new Map(); 
    Object.entries(finished).map((l) => {
        const mode: GameModesTypes = l[0] as GameModesTypes;
        const levels = Object.values(l[1]);
        finsihedMap.set(mode, levels);
    });

    return finsihedMap;
}

export const formatFinishedForDB = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    const obj: Record<string, IFinishedLevel[]> = {};

    finished.forEach((levels, mode) => {
        obj[mode] =  levels; 
    })

    return obj;
}

export const addFinished = (dataFromDB: Omit<IPlayerInfo, "finished">) => {
    const emptyInitialFinished: Map<GameModesTypes, IFinishedLevel[]> = new Map([ 
        ["education", []],
        ["emotional", []],
        ["events", []],
        ["states", []],
    ]); 

    const data: IPlayerInfo = {
        ...dataFromDB,
        finished: emptyInitialFinished,
    }

    return data;
}
