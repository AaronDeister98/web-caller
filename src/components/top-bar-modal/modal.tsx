import { Box, Modal } from "@mui/material";

export default function OpenModal({ open, button, onClose }: {
    open: boolean;
    button: string;
    onClose: () => void;
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    padding: '20px',
                    borderRadius: 2,
                    boxShadow: 24,
                    minWidth: 300,
                }}
            >
                <h2 id="modal-modal-title">Clicked!</h2>
                <p id="modal-modal-description">
                    Button [{button}] has been clicked.
                </p>
                <button onClick={onClose}>Close</button>
            </Box>
        </Modal>
    );
}