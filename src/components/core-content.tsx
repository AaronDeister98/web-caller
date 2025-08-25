import { useState } from "react";
import OpenModal from "./top-bar-modal/modal";
import { Box } from "@mui/material";

export function CoreContent() {
    const [modalState, setModalState] = useState({ open: false, button: "" });

    const openModal = (button: string) => setModalState({ open: true, button });
    const closeModal = () => setModalState({ open: false, button: "" });
    return (
        <div>
            <Box textAlign='center' padding={2}>
                <h1>Core Content</h1>
                <p style={{ paddingBlockEnd: 10 }}>This is the core content area of the application.</p>
                <button onClick={() => openModal('Submit')}>Click Me</button>
            </Box>
            <OpenModal
                open={modalState.open}
                onClose={closeModal}
                button={modalState.button}
            />
        </div>
    );
}