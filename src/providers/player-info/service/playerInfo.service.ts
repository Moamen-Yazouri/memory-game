import { get, getDatabase, ref } from "firebase/database";
import { addFinished, getFinsihedInfo } from "../utils/formatRealtimeDB";
import { CompletedDB, GameModesTypes, IFinishedLevel } from "@/@types";
import { IPlayerInfo } from "../playerInfoContext";

class PlayerInfoService {
    private db = getDatabase();

    async getPlayerInfo(id: string): Promise<IPlayerInfo | null> {
        const playerInfoRef = ref(this.db, `users/${id}/playerInfo`);
        const info = await get(playerInfoRef);
        try {

            if(info.exists()) {
                if(info.val().finished) {
                    const finished: Map<GameModesTypes, IFinishedLevel[]> = getFinsihedInfo(info.val() as CompletedDB);
                    const playerInfo: IPlayerInfo = {
                        ...info.val(),
                        finished,
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
        const db = getDatabase();
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