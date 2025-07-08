import { createContext } from "react";
import useTheme from "./hook/useTheme";
import type { 
    IContextProvider,
    ThemeContext 
} from "./types";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { getTheme } from "./createTheme";

export const GameThemeContext = createContext<ThemeContext>({
    toggleTheme: () => {},
    mode: "light",
    theme: getTheme("light"),
});

const ThemeContextProvider = (props: IContextProvider) => {
    const {
        mode,
        setMode,
        theme,
    } = useTheme();
    const toggleTheme = () => {
        setMode(mode === "light" ? "dark" : "light");
    };
    const value: ThemeContext = {
        toggleTheme,
        mode,
        theme,
    };
    return <GameThemeContext.Provider value={value}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {props.children}
                </ThemeProvider>
            </GameThemeContext.Provider>
};

export default ThemeContextProvider;