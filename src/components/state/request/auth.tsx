import { create } from "zustand";

export interface AuthAttribs { authType: 'basic' | 'bearer' | 'none', token?: string, username?: string, password?: string }
export interface AuthState {
    authState: AuthAttribs
    updateAuthState: (attrs: AuthAttribs) => void
}

export const authStore = create<AuthState>()((set) => ({
    authState: { authType: 'none' },
    updateAuthState: (attrs: AuthAttribs) => set((state) => ({ authState: { ...state.authState, ...attrs } }))
}))
