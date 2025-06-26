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
}

export type LevelsTypes = `${Levels}`;

export interface ICurrentMode {
    modeName: GameModesTypes,
    level: LevelsTypes,
}

export interface IFinishedLevel {
    level: string,
    score: number,
    time: number,
    attempt: number,
}

export type FinishedModes = Partial<Record<GameModesTypes, IFinishedLevel>>;

export interface IMonster {
    unlocked: boolean,
    score: number,
    attempts: number,
    time: number,
}


