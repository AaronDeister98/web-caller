import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import WebIcon from '@mui/icons-material/Web'
import { useStore } from "zustand"
import { interfaceVisibilityStore } from "./state/request-interface"
import { SideBarButtonOption } from "../structures/components"

export function SideDrawer(props: { state: boolean, setState: (state: boolean) => void }) {
    const { state, setState } = props
    const { setActiveInterface } = useStore(interfaceVisibilityStore)
    const handleDrawerButtonClick = (text: SideBarButtonOption) => {
        setActiveInterface(text)
    }

    return (
        <Drawer open={state} onClose={() => setState(false)}>
            <Box>
                <List>
                    {Object.values(SideBarButtonOption).map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleDrawerButtonClick(text)}>
                                <ListItemIcon>
                                    <WebIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}