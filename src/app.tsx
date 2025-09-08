

import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { TopMenuBar } from './components/top-bar'
import { WorkbenchInterface } from './components/workbench/workbench-interface'
import { useStore } from 'zustand';
import { interfaceVisibilityStore } from './components/state/interface-visibility';
import { themeStore } from './components/theme';
import { AboutBlock } from './components/about';



export default function App() {
    const { activeInterface } = useStore(interfaceVisibilityStore)
    const { themeState } = useStore(themeStore)
    return (
        <div>
            <ThemeProvider theme={themeState}>
                <CssBaseline />
                <TopMenuBar />
                {activeInterface === 'Workbench' && <WorkbenchInterface />}
                {activeInterface === 'About' && <AboutBlock />}
            </ThemeProvider>
        </div >
    )
}