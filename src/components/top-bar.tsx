import { AppBar, Box, IconButton, Menu, MenuItem, Modal, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
/**
 * Top menu bar component.
 * @returns A styled AppBar with a title.
 */
import React, { useState } from 'react';
import OpenModal from './top-bar-modal/modal';
import { button } from './button';




export function TopMenuBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalState, setModalState] = useState({ open: false, button: "" });

    const openModal = (button: string) => setModalState({ open: true, button });
    const closeModal = () => setModalState({ open: false, button: "" });
    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={e => setAnchorEl(e.currentTarget)}
                    >
                        {<MenuIcon></MenuIcon>}
                        <span className="material-icons"></span>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => {
                            // setAnchorEl(null)
                            openModal('1')
                        }
                        }>Item 1</MenuItem>
                        <MenuItem onClick={() => {
                            // setAnchorEl(null)
                            openModal('2')
                        }
                        }>Item 2</MenuItem>
                        <MenuItem onClick={() => {
                            // setAnchorEl(null)
                            openModal('3')
                        }
                        }>Item 3</MenuItem>
                        <OpenModal
                            open={modalState.open}
                            onClose={() => { closeModal(), setAnchorEl(null) }}
                            button={modalState.button}
                        />
                    </Menu>
                </div>
                <h1>My Application</h1>
            </Toolbar>
        </AppBar>
    )
}
