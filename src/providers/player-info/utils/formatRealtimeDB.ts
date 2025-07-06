import { CompletedDB, GameModesTypes, IFinishedLevel } from "@/@types";

export const getFinsihedInfo = (finished: CompletedDB): Map<GameModesTypes, IFinishedLevel[]> => {
    const finsihedMap: Map<GameModesTypes, IFinishedLevel[]> = new Map(); 
    Object.entries(finished).map((l) => {
        const mode: GameModesTypes = l[0] as GameModesTypes;
        const levels = Object.values(l[1]);
        finsihedMap.set(mode, levels);
    });

    return finsihedMap;
}
