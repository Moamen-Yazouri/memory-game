import { initialPlayer } from "@/providers/player-info/constants";
import { finished } from "stream";

export const INITIAL_STATE = {
    currentInfo: initialPlayer.currentInfo,
    finished: initialPlayer.finished,
    monster: initialPlayer.monster, 
}