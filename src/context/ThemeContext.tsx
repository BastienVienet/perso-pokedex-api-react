import {createContext, useState} from "react";
import {Theme} from "../types";

type Context = {
    themeState: [Theme, (theme: Theme) => void],
    toggleTheme: () => void,
}

export const ThemeContext = createContext<Context>(
    {
        themeState: [Theme.Light, () => {}],
        toggleTheme: () => {},
    }
)

export function ThemeProvider({children}: any) {

    const themeState = useState(Theme.Light)
    const [theme, setTheme] = themeState

    const toggleTheme = () => {
        if (theme === Theme.Light) {
            setTheme(Theme.Dark)
        } else {
            setTheme(Theme.Light)
        }
    }

    const context = {themeState: themeState, toggleTheme: toggleTheme}

    return (
        <ThemeContext.Provider value={context}>
            {children}
        </ThemeContext.Provider>
    )
}