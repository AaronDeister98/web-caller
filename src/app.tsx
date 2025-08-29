

import { Box, CssBaseline } from '@mui/material'
import Button from '@mui/material/Button'
import { TopMenuBar } from './components/top-bar'
import { CoreContent } from './components/core-content'
import { useState, createContext } from 'react';


export default function App() {
    const [authState, setAuthState] = useState<{ authType: 'basic' | 'bearer' | '', token?: string, username?: string, password?: string }>({ authType: '' });
    const AuthContext = createContext(authState);
    return (
        <div>
            <CssBaseline />
            <TopMenuBar />
            <CoreContent />
        </div >
    )
}