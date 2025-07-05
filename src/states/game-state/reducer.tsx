import { IGameCard, LevelsTypes } from "@/@types";
import { getGameCards } from "./utils/createGameCards";

export interface IState {
    cards: IGameCard[],
    wrongMoves: number,
    openCards: IGameCard[],
    initialized: boolean,
}

export type Action = 
    {type: "INITIAL_GAME", payload: LevelsTypes} |
    {type: "FLIPP_CARD", payload: number} |
    {type: "CHECK_MATCHED"} 

export const reducer = (state: IState, action: Action) => {
    switch(action.type) {
        case "INITIAL_GAME": {
            const cards = getGameCards(action.payload);
            return {
                ...state,
                cards
            }
        }

        case "FLIPP_CARD": {
            const clicked = state.cards.find((c) => c.id == action.payload);
            const exists = state.openCards.find((c) => (c.id == action.payload));

            if(exists && state.openCards.length < 2) {
                const newCards = state.cards.map((c) => (
                    c.id == action.payload 
                    ? {...c, isFlipped: false}
                    : c
                ));
                
                return {
                    ...state, 
                    openCards: [],
                    cards: newCards,
                }
            }

            if(state.openCards.length > 1 || !clicked ) {
                return state;
            }
            
            const newCards = state.cards.map((c) => (
                c.id == action.payload 
                ? {...c, isFlipped: true}
                : c
            ));

            const opened = [...state.openCards, clicked];
            return {
                ...state,
                openCards: opened,
                cards: newCards,
            };
        }

        case "CHECK_MATCHED": {
            if(state.openCards.length == 2) {
                const c1 = state.openCards[0];
                const c2 = state.openCards[1];
                console.log("ttt")
                if(c1.value == c2.value) {
                    console.log("matched")
                    const newCards = state.cards.map((c) => (
                        c.id == c1.id || c.id == c2.id
                        ? {...c, isMatched: true}
                        : c
                    ));

                    return {
                        ...state,
                        cards: newCards,
                        openCards: [],
                    }
                }
                else {
                    console.log("not matched")
                    console.log("not matched")
                    const newCards = state.cards.map((c) => (
                        c.id == c1.id || c.id == c2.id
                        ? {...c, isFlipped: false}
                        : c
                    ));
                    
                    return {
                        ...state,
                        cards: newCards,
                        openCards: [],
                    }
                }
            }
            else {
                return state;
            }
        }
    }

}