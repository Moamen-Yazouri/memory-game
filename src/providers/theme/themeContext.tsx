import { createContext } from "react";
import useTheme from "./hook/useTheme";
import type { 
    IContextProvider,
    ThemeContext 
} from "./types";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext<ThemeContext>({
    toggleTheme: () => {},
    mode: "light",
    theme: {},
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
    return <ThemeContext.Provider value={value}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {props.children}
                </ThemeProvider>
            </ThemeContext.Provider>
};

export default ThemeContextProvider;