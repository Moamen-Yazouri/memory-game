import { INITIAL_STATE } from "@/states/game-state/constants"
import { IGameInfo, IGameInfoContext } from "./gameInfo"

export const initialGame: IGameInfo = {
    mode: null,
    level: null,
}
export const initialContext: IGameInfoContext = {
    state: INITIAL_STATE,
    dispatch: () => { },
    gameInfo: initialGame,
    changeLevel: () => { },
    changeMode: () => { },
}

