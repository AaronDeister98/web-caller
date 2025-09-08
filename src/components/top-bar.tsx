import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, Modal, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * Top menu bar component.
 * @returns A styled AppBar with a title.
 */
import { useState } from 'react';
import { SideDrawer } from './drawer';
import { useStore } from 'zustand';
import { themeStore } from './theme';




export function TopMenuBar() {

    const { themeState, setThemeState } = useStore(themeStore)
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={e => setDrawerOpen(true)}
                    >
                        {<MenuIcon></MenuIcon>}
                        <span className="material-icons"></span>
                    </IconButton>
                    <SideDrawer state={drawerOpen} setState={setDrawerOpen}>

                    </SideDrawer>
                </div>
                <h1>HTTP Workbench</h1>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="theme"
                    onClick={e => setThemeState(themeState.palette.mode)}
                >
                    {themeState.palette.mode === 'dark' && <ModeNightIcon />}
                    {themeState.palette.mode === 'light' && <LightModeIcon />}
                    <span className="material-icons"></span>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
