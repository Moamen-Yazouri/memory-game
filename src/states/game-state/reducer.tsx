import { IGameCard, LevelsTypes } from "@/@types";
import { getGameCards } from "./utils/createGameCards";

export interface IState {
    cards: IGameCard[],
    wrongMoves: number,
    openCards: IGameCard[],
    initialized: boolean,
}

export type Action = 
    {type: "INITIAL_GAME", payload: LevelsTypes}

export const reducer = (state: IState, action: Action) => {
    switch(action.type) {
        case "INITIAL_GAME": {
            const cards = getGameCards(action.payload);
            return {
                ...state,
                cards
            }
        }
    }
}