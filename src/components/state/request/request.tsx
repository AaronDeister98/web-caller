import { AxiosRequestConfig } from "axios";
import { create } from "zustand";

export interface RequestState {
    requestState: AxiosRequestConfig
    setRequestState: (request: AxiosRequestConfig) => void
}

export const requestStore = create<RequestState>()((set) => ({
    requestState: {} as AxiosRequestConfig,
    setRequestState: (attrs: AxiosRequestConfig) => set(() => ({ requestState: { ...attrs } }))
}))