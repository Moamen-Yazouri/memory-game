import { CompletedLevels, GameModesTypes, IMonster, LevelsTypes } from "@/@types";

interface IPlayerInfoContext {
    currentMode: GameModesTypes,
    currentLevel: LevelsTypes,
    finished: CompletedLevels,
    monster: IMonster,
}