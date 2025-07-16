import { GameModesTypes, IGameCard, LevelsTypes } from "@/@types";
import { getGameCards } from "./utils/createGameCards";

export interface IState {
    cards: IGameCard[],
    wrongMoves: number,
    score: number,
    time: number,
    isCompleted: boolean,
    isOver: boolean,
    openCards: IGameCard[],
    isGameActive: boolean,
    initialized: boolean,
}

export type Action = 
    {type: "INITIAL_GAME", payload: {level: LevelsTypes, mode: GameModesTypes | null}} |
    {type: "FLIPP_CARD", payload: number} |
    {type: "CHECK_MATCHED"} |
    {type: "RESTART_GAME", payload: {level: LevelsTypes, mode: GameModesTypes | null}} |
    {type: "HANDLE_TIME", payload: number}  |
    {type: "RESET_GAME"} |
    {type: "GAME_OVER"} |
    {type: "SHOW_ALL"} |
    {type: "HIDE_ALL"} 

export const reducer = (state: IState, action: Action) : IState=> {
    switch(action.type) {
        case "INITIAL_GAME": {
                
                const cards = getGameCards(action.payload.level, action.payload.mode);
                return {
                    ...state,
                    cards,
                    initialized: true,
                    wrongMoves: 0,
                    time: 0,
                    score: 0,
                    isOver: false,
                    isGameActive: false,
                    isCompleted: false,
                    openCards: [],

                }
        }

        case "HANDLE_TIME": {
            return {
                ...state,
                time: state.time + action.payload,
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
                    isGameActive: true, 
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
                isGameActive: true,
                openCards: opened,
                cards: newCards,
            };
        }

        case "CHECK_MATCHED": {
            if(state.openCards.length == 2) {
                const c1 = state.openCards[0];
                const c2 = state.openCards[1];
                if(c1.value == c2.value) {
                    const newCards = state.cards.map((c) => (
                        c.id == c1.id || c.id == c2.id
                        ? {...c, isMatched: true}
                        : c
                    ));
                    const isCompleted = newCards.every((c) => c.isMatched);
                    return {
                        ...state,
                        score: state.score + 20,
                        isCompleted,
                        isGameActive: isCompleted ? false : true,
                        cards: newCards,
                        openCards: [],
                    }
                }
                else {
                    
                    const newCards = state.cards.map((c) => (
                        c.id == c1.id || c.id == c2.id
                        ? {...c, isFlipped: false}
                        : c
                    ));
                    
                    return {
                        ...state,
                        wrongMoves: state.wrongMoves +1,
                        score: state.score - 10,
                        cards: newCards,
                        openCards: [],
                    }
                }
            }
            else {
                return state;
            }
        }

        case "RESTART_GAME": {
            const cards = getGameCards(action.payload.level, action.payload.mode);
            return {
                ...state,
                cards,
                wrongMoves: 0,
                time: 0,
                score: 0,
                isOver: false,
                isGameActive: false,
                isCompleted: false,
                openCards: [],
                initialized: true,
            }
        }

        case "RESET_GAME": {
            return {
                ...state,
                cards: [],
                wrongMoves: 0,
                isOver: false,
                time: 0,
                score: 0,
                isGameActive: false,
                isCompleted: false,
                openCards: [],
                initialized: false,
            }
        }

        case "GAME_OVER": {
            return {
                ...state,
                isGameActive: false,
                isOver: true,

            }
        }

        case "SHOW_ALL": {
            const newCards = state.cards.map((c) => ({...c, isFlipped: true}))
            return {
                ...state,
                cards: newCards
            }
        }
        case "HIDE_ALL": {
            const newCards = state.cards.map((c) => ({...c, isFlipped: false}))
            return {
                ...state,
                cards: newCards
            }
        }
    }


}