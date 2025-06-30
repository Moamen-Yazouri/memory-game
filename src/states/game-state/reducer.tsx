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
    {type: "FLIPP_CARD", payload: number}

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
            let opened = [...state.openCards];
            const selected = state.cards.find((c) => {
                c.id === action.payload;
            });
            opened.push(selected!);

            if(opened.length == 2) {
                const c1 = opened[0];
                const c2 = opened[1];

                if(c1.value == c2.value) {
                    const newCards = state.cards.map((c) => (
                        c.id == c1.id || c.id == c2.id 
                        ? {...c, isMatched: true}
                        : c
                    ));
                    opened = [];
                    return {
                        ...state,
                        cards: newCards,
                        openCards: opened, 
                    };
                }
                else {
                    setTimeout(() => {
                        const newCards = state.cards.map((c) => (
                            c.id == c1.id || c.id == c2.id 
                                ? {...c, isFlipped: false}
                                : c
                        ));

                        opened = [];
                        return {
                            ...state,
                            cards: newCards,
                            openCards: opened,
                            wrongMoves: state.wrongMoves +1
                        }
                    }, 500);
                }
            }

            else {
                const newCards = state.cards.map((c) => (
                    opened[0].id == c.id 
                        ? {...c, isFlipped: true}
                        : c
                ));
                return {
                    ...state, 
                    openCards: opened,
                    cards: newCards,
                }
            }
        }
    }
}