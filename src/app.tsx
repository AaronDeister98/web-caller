

import { Box, CssBaseline } from '@mui/material'
import Button from '@mui/material/Button'
import { TopMenuBar } from './components/top-bar'
import { CoreContent } from './components/core-content'

export default function App() {
    return (
        <div>
            <CssBaseline />
            <TopMenuBar />
            <CoreContent />
        </div >
    )
}