import { ThemeModes } from "@/@types";
import { Theme } from "@mui/material";





export interface ThemeContext {
    toggleTheme: () => void;
    mode: ThemeModes;
    theme: Theme
}

export interface IContextProvider {
    children: React.ReactNode;
}

