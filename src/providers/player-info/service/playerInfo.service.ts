import { get, ref } from "firebase/database";
import { addFinished, getFinsihedInfo } from "../utils/formatRealtimeDB";
import { CompletedDB, GameModesTypes, IFinishedLevel } from "@/@types";
import { IPlayerInfo } from "../playerInfoContext";
import { db } from "@/firebase/firebase";

class PlayerInfoService {
    

    async getPlayerInfo(id: string): Promise<IPlayerInfo | null> {
        const playerInfoRef = ref(db, `users/${id}/playerInfo`);
        const info = await get(playerInfoRef);
        try {

            if(info.exists()) {
                if(info.val().finished) {
                    const finished: Map<GameModesTypes, IFinishedLevel[]> = getFinsihedInfo(info.val().finished as CompletedDB);
                    let playerInfo: IPlayerInfo;
                    if(finished) {
                         playerInfo = {
                            ...info.val(),
                            finished,
                        }
                    }
                    else {
                        playerInfo = {
                            ...info.val(),
                        }
                    }
                    return playerInfo;
                }
                else {
                    return addFinished(info.val());
                }
            }
            else {
                return null;
            }

        }
        catch(err) {
            console.error("Error while getting player info", err);
            return null;
        }
    }

    async checkIsExist(id: string) {
        const userRef = ref(db, `users/${id}/playerInfo`); // or whatever path you use

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }

    }
}

export default new PlayerInfoService();