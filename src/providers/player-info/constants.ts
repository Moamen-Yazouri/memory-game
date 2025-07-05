import { IPlayerInfoContext } from "./playerInfoContext";

export const INITIAL_CONTEXT_STATE: IPlayerInfoContext = {
    current: {
        modeName: "education",
        level: "easy",
    },
    finished: {
        education: {},
        emotional: {},
        events: {},
        states: {},
    },
    monster: {
        unlocked: false,
        score: 0,
        wrongMoves: 0,
        time: 0,
    }

}