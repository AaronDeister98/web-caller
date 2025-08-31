import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import Box from "@mui/material/Box";
import Editor from '@monaco-editor/react'

interface JsonBlockProps {
    data: any;
    themeMode: "light" | "dark";
    readOnly?: boolean;   // default false
    onChange?: (value: any) => void;
}

export default function JsonBlock({
    data,
    themeMode,
    readOnly = false,
    onChange,
}: JsonBlockProps) {
    const prettyJson = JSON.stringify(data, null, 2);

    if (readOnly) {
        return (
            <Box
                component="div"
                sx={{
                    border: 1,
                    textAlign: "left",
                    m: 0,
                    p: 2,
                    bgcolor: "background.default",
                    color: "text.primary",
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    borderRadius: 2,
                    maxHeight: 400,
                    overflowY: "auto",
                    overflowX: "auto",
                    cursor: "default",
                    userSelect: "text",
                }}
            >
                <SyntaxHighlighter
                    language="json"
                    style={themeMode === "dark" ? vscDarkPlus : prism}
                    customStyle={{
                        margin: 0,
                        background: "transparent",
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                    }}
                >
                    {prettyJson}
                </SyntaxHighlighter>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 200,
                maxHeight: 600,
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Editor
                height='300px' // these are hardcoded right now due to the editor collapsing
                width='600px'
                language="json"
                value={JSON.stringify(data, null, 2)}
                theme={themeMode === "dark" ? "vs-dark" : "light"}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                }}
                onChange={(val) => {
                    try {
                        const parsed = JSON.parse(val || "");
                        onChange?.(parsed);
                    } catch {
                        // ignore invalid JSON
                    }
                }}
            />
        </Box>
    );
}
