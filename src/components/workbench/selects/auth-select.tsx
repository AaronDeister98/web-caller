import { FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { RequestProps } from "../workbench-interface";
import { AxiosRequestHeaders } from "axios";
import { useStore } from "zustand";
import { authStore } from "../../state/request/auth";


export function AuthSelect(props: { onChange: (event: RequestProps) => void }) {
    const { onChange } = props
    const { authState, updateAuthState } = useStore(authStore);

    const handleAuthTypeChange = (event: SelectChangeEvent) => {
        updateAuthState({ authType: event.target.value as 'basic' | 'bearer' | '', token: '', username: '', password: '' });
    }

    const handleCredentialChange = (event: React.ChangeEvent<HTMLInputElement>, changeType: 'token' | 'username' | 'password') => {
        updateAuthState({ ...authState, authType: changeType === 'token' ? 'bearer' : 'basic', [changeType]: event.target.value });
        let encoded;
        if (changeType !== 'token') {
            encoded = changeType === 'username' ? btoa(`${event.target.value}:${authState.password}`) : btoa(`${authState.username}:${event.target.value}`);
        }
        onChange({ headers: { Authorization: `${changeType === 'token' ? `Bearer ${authState.token}` : `Basic ${encoded}`}` } as AxiosRequestHeaders });
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
                onChange={(e) => handleCredentialChange(e as React.ChangeEvent<HTMLInputElement>, 'token')}
            >
            </TextField>}
            {authState.authType !== '' && authState.authType !== 'bearer' && <TextField
                label='Username'
                title='Username'
                variant="outlined"
                size='small'
                style={{ width: 600, marginTop: 20 }}
                value={authState.username}
                onChange={(e) => handleCredentialChange(e as React.ChangeEvent<HTMLInputElement>, 'username')}
            >
            </TextField>}
            {authState.authType !== '' && authState.authType !== 'bearer' && <TextField
                label='Password'
                title='Password'
                variant="outlined"
                size='small'
                style={{ width: 600, marginTop: 20 }}
                value={authState.password}
                onChange={(e) => handleCredentialChange(e as React.ChangeEvent<HTMLInputElement>, 'password')}
            >
            </TextField>}

        </FormControl>

    )
}