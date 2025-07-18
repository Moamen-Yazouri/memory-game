import { 
    GameModesTypes, 
    ICurrent, 
    IFinishedLevel, 
    IMonster 
} from "@/@types";
import { IPlayerInfo } from "@/providers/player-info/playerInfoContext";

export interface IState {
    currentInfo: ICurrent,
    finished: Map<GameModesTypes, IFinishedLevel[]>,
    monster: IMonster,
}
export type Action = 
    {type: "INITIAL_INFO", payload: IPlayerInfo} |
    {type: "CHANGE_CURRENT", payload: ICurrent}  |
    {type: "ADD_FINISHED", payload: {mode: GameModesTypes, level: IFinishedLevel}} |
    {type: "FINISH_MONSTER", payload: IMonster} 

export const reducer = (state: IState, action: Action): IState => {
    switch(action.type) {
        case "INITIAL_INFO": {
            return {
                ...state,
                currentInfo: action.payload.currentInfo,
                finished: action.payload.finished,
                monster: action.payload.monster,
            }
        }

        case "CHANGE_CURRENT": {
            return {
                ...state,
                currentInfo: action.payload,
            }
        }

        case "ADD_FINISHED": {
            console.log(action.payload.level.level)
            const prevFinishedLevels = state.finished.get(action.payload.mode) || [];
            const finishedLevel = action.payload.level.level;
            const cleanFinished = prevFinishedLevels.filter((l) => l.level !== finishedLevel);
            const newMap = new Map(state.finished);        
            newMap.set(action.payload.mode, [...cleanFinished, action.payload.level]);
    
            return {
                ...state,
                finished: newMap,
            }
        }

        case "FINISH_MONSTER": {
            return {
                ...state,
                monster: action.payload
            }
        }

    }

}