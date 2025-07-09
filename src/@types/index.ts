enum Mode {
    LIGHT = 'light',
    DARK = 'dark',
}

export type ThemeModes = `${Mode}` ;

export interface IUserInfo {
    name: string,
    email: string,
}

enum GameModes {
    Education = 'education',
    Emotional = 'emotional',
    Events = "events",
    States = "states",
}

export type GameModesTypes = `${GameModes}`;

export enum Levels {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    VeryHard = 'veryHard',
    Monster = 'monster'
}

export type LevelsTypes = `${Levels}`;

export interface ICurrent {
    modeName: GameModesTypes,
    level: LevelsTypes,
}

export interface IFinishedLevel {
    level: LevelsTypes,
    score: number,
    time: number,
    wrongMoves: number,
}



export type CompletedDB = {
  [mode in GameModesTypes]: Partial<Record<LevelsTypes, IFinishedLevel>>
};

export interface IMonster {
    unlocked: boolean,
    score: number,
    wrongMoves: number,
    time: number,
}

export interface IGameCard {
    id: number,
    value: number,
    isFlipped: boolean,
    isMatched: boolean,
}

export interface IUser {
    id: string,
    name: string,
    email: string,
}

