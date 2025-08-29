import { FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { RequestProps } from "../core-content";
import { AxiosRequestHeaders } from "axios";
import { useContext } from "react";
import { useStore } from "zustand";
import { authStore } from "../contexts/request/auth";


export function AuthSelect(props: { onChange: (event: RequestProps) => void }) {
    const { onChange } = props
    const { authState, updateAuthState } = useStore(authStore);

    const handleAuthTypeChange = (event: SelectChangeEvent) => {
        updateAuthState({ authType: event.target.value as 'basic' | 'bearer' | '' });
    }

    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateAuthState({ ...authState, authType: 'bearer', token: event.target.value });
        onChange({ headers: { Authorization: `Bearer ${authState.token}` } as AxiosRequestHeaders })
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateAuthState({ ...authState, authType: 'basic', username: event.target.value });
        const encoded = btoa(`${event.target.value}:${authState.password}`);
        onChange({ headers: { Authorization: `Basic ${encoded}` } as AxiosRequestHeaders })
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateAuthState({ ...authState, authType: 'basic', password: event.target.value });
        const encoded = btoa(`${authState.username}:${event.target.value}`);
        onChange({ headers: { Authorization: `Basic ${encoded}` } as AxiosRequestHeaders })
    }

    return (

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
                labelId='auth-select-label'
                id='auth-select'
                value={authState.authType}
                label='Auth'
                onChange={handleAuthTypeChange}
                sx={{ textAlign: 'left' }}
            >
                <MenuItem value={'basic'}>Basic Auth</MenuItem>
                <MenuItem value={'bearer'}>Bearer Token</MenuItem>
            </Select>
            {authState.authType !== '' && authState.authType !== 'basic' && <TextField
                label='Token'
                title='Token'
                variant="outlined"
                size='small'
                style={{ width: 600, marginTop: 20 }}
                value={authState.token}
                onChange={handleTokenChange}
            >
            </TextField>}
            {authState.authType !== '' && authState.authType !== 'bearer' && <TextField
                label='Username'
                title='Username'
                variant="outlined"
                size='small'
                style={{ width: 600, marginTop: 20 }}
                value={authState.username}
                onChange={handleUsernameChange}
            >
            </TextField>}
            {authState.authType !== '' && authState.authType !== 'bearer' && <TextField
                label='Password'
                title='Password'
                variant="outlined"
                size='small'
                style={{ width: 600, marginTop: 20 }}
                value={authState.password}
                onChange={handlePasswordChange}
            >
            </TextField>}

        </FormControl>

    )
}