import { GameModes, GameModesTypes } from "@/@types";
import { getImageMode } from "../utils/getImageMode";

export const getCardImage = (index: number, mode: GameModesTypes | null) => {
    if(!mode) {
        const cats = Object.values(GameModes).map((m) => getImageMode(m));
        const randomIndex = Math.floor(Math.random() * length);
        const extension = cats[randomIndex] === "education" ? "jpg" : "png";
        return `https://api.clipart.com/img/previews/${cats[randomIndex]}-${index}.${extension}` 
    }
    const cat = getImageMode(mode);
    const extension = mode === "education" ? "jpg" : "png"; 
    return `https://api.clipart.com/img/previews/${cat}-${index}.${extension}`;
}

