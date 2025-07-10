import { GameModesTypes } from "@/@types";
import { getImageMode } from "../utils/getImageMode";

export const getCardImage = (index: number, mode: GameModesTypes | null) => {
    const cat = getImageMode(mode);
    const extension = mode === "education" ? "jpg" : "png"; 
    return `https://api.clipart.com/img/previews/${cat}-${index}.${extension}`;
}