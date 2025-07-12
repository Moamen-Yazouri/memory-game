
import { getTheme } from "./createTheme";
import { ThemeContext } from "./types";

export const INITIAL_CONTEXT: ThemeContext = {
    toggleTheme: () => {},
    mode: "light",
    theme: getTheme("light"),
}