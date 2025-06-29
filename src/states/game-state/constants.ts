import { IState } from "./reducer";

export const INITIAL_STATE: IState = {
    cards: [],
    wrongMoves: 0,
    openCards: [],
    initialized: false,
}