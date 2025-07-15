import { IState } from "./reducer";

export const INITIAL_STATE: IState = {
    cards: [],
    wrongMoves: 0,
    time: 0,
    score: 0,
    isOver: false,
    openCards: [],
    isGameActive: false,
    isCompleted: false,
    initialized: false,
}