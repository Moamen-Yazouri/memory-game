import { GameModesTypes } from "@/@types";

export const getImageMode = (mode: GameModesTypes | null) => {
    switch(mode) {
        case "states": return "state";
        case "education": return "education";
        case "events": return "holiday"; 
        case "emotional": return "sel";
        default: return "education";
    }
}