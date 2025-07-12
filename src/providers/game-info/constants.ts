import { INITIAL_STATE } from "@/reducers/game-state/constants"
import { IGameInfo, IGameInfoContext } from "./gameInfo"

export const initialGame: IGameInfo = {
    mode: null,
    level: null,
}
export const initialContext: IGameInfoContext = {
    gameState: INITIAL_STATE,
    gameDispatch: () => { },
    gameInfo: initialGame,
    changeLevel: () => { },
    changeMode: () => { },
}

