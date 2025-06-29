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

enum Levels {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    VeryHard = 'veryHard',
    Monster = 'monster'
}

export type LevelsTypes = `${Levels}`;

export interface ICurrentMode {
    modeName: GameModesTypes,
    level: LevelsTypes,
}

export interface IFinishedLevel {
    mode: GameModesTypes,
    level: string,
    score: number,
    time: number,
    attempt: number,
}

export type CompletedLevels = {
  [mode in GameModesTypes]: Partial<Record<LevelsTypes, IFinishedLevel>>
};

export interface IMonster {
    unlocked: boolean,
    score: number,
    attempts: number,
    time: number,
}

export interface IGameCard {
    id: number,
    isFlipped: boolean,
    isMatched: boolean,
}
