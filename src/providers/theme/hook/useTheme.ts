import { useMemo, useState } from "react"
import { getTheme } from "../createTheme"
import type { ThemeModes } from "../../../@types";

const useTheme = () => {
    const [mode, setMode] = useState<ThemeModes>("dark");
    const theme = useMemo(() => (getTheme(mode)), [mode]);
    return {
        mode,
        theme,
        setMode,
    }
}

export default useTheme;