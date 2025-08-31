import { TextField } from "@mui/material";

export function UrlBar(props: { onChange: (value: string) => void }) {
    return (
        <TextField
            label='URL'
            title='URL'
            variant="outlined"
            size='small'
            style={{ width: 600 }}
            onChange={e => props.onChange(e.target.value)}
        />
    )
}