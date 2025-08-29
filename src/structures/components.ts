export interface AuthSelectProps {
    authType: 'basic' | 'bearer' | '';
    token?: string;
    username?: string;
    password?: string;
}

export interface Param { key: string, value: string }
export interface Header { key: string, value: string }