import { 
    GameModesTypes, 
    IFinishedLevel, 
    LevelsTypes 
} from "@/@types";

export const getCompletedAndUnlocked = (finished: Map<GameModesTypes, IFinishedLevel[]>) => {
    const completedLevels: Record<GameModesTypes, Partial<LevelsTypes[]>> = {
        education: [],
        states: [],
        emotional: [],
        events: []
    };
    const unLockedLevels: Record<GameModesTypes, Partial<LevelsTypes[]>> = {
        education: ["easy"],
        states: ["easy"],
        emotional: ['easy'],
        events: ["easy"]
    };

    const modes: GameModesTypes[] = ["states", "emotional", "education", "events"];

    modes.forEach((mode) => {
        const finishedLevelsDetail: IFinishedLevel[] = finished.get(mode) || [];
        const finishedLevels = finishedLevelsDetail.map((i) => i.level);
        const unlocked = unLockedLevels[mode];

        if(finishedLevels.includes("easy")) {
            unLockedLevels[mode] = [...unlocked, "medium"];
        }

        else if(finishedLevels.includes("medium")) {
            unLockedLevels[mode] = [...unlocked, "hard"];
        }

        else if (finishedLevels.includes("hard")) {
            finishedLevels.includes("veryHard");
        }
        completedLevels[mode as GameModesTypes] = finishedLevels;
    });

    return [
        completedLevels,
        unLockedLevels,
    ]
}