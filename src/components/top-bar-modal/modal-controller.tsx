import { useState } from "react"
import OpenModal from "./modal"

export function ModalController() {
    const [modalState, setModalState] = useState({ open: false, button: "" });

    const openModal = (button: string) => setModalState({ open: true, button });
    const closeModal = () => setModalState({ open: false, button: "" });

    return (
        <>
            <button onClick={() => openModal("1")}>Open Modal for Button 1</button>
            <button onClick={() => openModal("2")}>Open Modal for Button 2</button>
            <OpenModal
                open={modalState.open}
                button={modalState.button}
                onClose={closeModal}
            />
        </>
    );
}