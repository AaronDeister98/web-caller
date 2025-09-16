import { Box } from "@mui/material";

export function AboutBlock() {
    return (
        <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' padding='0.5'>
            <h1 style={{ marginBlockEnd: 1 }}>About</h1>
            <h2 style={{ margin: 2 }}>I'm a backend engineer who has always sucked at frontend development.</h2>
            <p style={{ maxWidth: '900px' }}>This app is intended to be a project to help me learn React as well as core frontend development concepts. So far, I think it's been a big success given how much I've learned since starting.</p>
            <p style={{ maxWidth: '900px', paddingBlockEnd: 25 }}>If you have any feedback, or want something added, please cut an issue <a href='https://github.com/AaronDeister98/http-workbench/issues'>here.</a> If you wish to contribute, please fork and create a pull request. Thanks!</p>
            <Box sx={{ alignItems: 'end', justifyContent: 'end', display: 'flex' }}>
                <footer>
                    <a href='https://github.com/aarondeister98'>Aaron Deister</a>
                </footer>
            </Box>
        </Box>
    )
}