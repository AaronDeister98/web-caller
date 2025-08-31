import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { create } from "zustand";

export interface ThemeState {
    themeState: Theme
    setThemeState: (mode: 'light' | 'dark') => void
}

const lightDarkSwitch = (currentMode: 'light' | 'dark') => {
    if (currentMode === 'light') {
        return 'dark'
    }
    return 'light'
}

export const themeStore = create<ThemeState>()((set) => ({
    themeState: createTheme({
        palette: {
            mode: 'dark'
        }
    }),
    setThemeState: (mode: 'light' | 'dark') => set(() => ({
        themeState: createTheme({
            palette: {
                mode: lightDarkSwitch(mode)
            }
        })
    }))
}))