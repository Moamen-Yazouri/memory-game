import { GameModesTypes, IFinishedLevel } from "@/@types";

export interface IDashboardFinished extends IFinishedLevel {
    mode: GameModesTypes,
}

export interface ICompletedMode {
  mode: GameModesTypes
  totalScore: number
  levelsCompleted: number
  averageTime: number
  totalWrongMoves: number
  bestScore: number
}