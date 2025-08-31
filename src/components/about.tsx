import { Box, Paper } from "@mui/material";

export function AboutBlock() {
    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: 3 }}>
            <h1 style={{ padding: 2 }}>About</h1>
            <h2 style={{ padding: 2 }}>I'm a backend engineer who has always sucked at frontend development.</h2>
            <p style={{ maxWidth: '900px', paddingBlockEnd: 50 }}>This app is intended to be a project to help me learn React as well as core frontend development concepts. So far, I think it's been a big success given how much I've learned since starting.</p>
            <Paper>
            </Paper>
            <Box sx={{ alignItems: 'end', justifyContent: 'end', display: 'flex' }}>
                <a href='https://github.com/aarondeister98'>Aaron Deister</a>
            </Box>
        </Box>
    )
}