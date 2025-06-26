import { ThemeModes } from "@/@types";
import type { Theme } from "@emotion/react";




export interface ThemeContext {
    toggleTheme: () => void;
    mode: ThemeModes;
    theme: Theme
}

export interface IContextProvider {
    children: React.ReactNode;
}

