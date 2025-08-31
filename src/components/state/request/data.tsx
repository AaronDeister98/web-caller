import { create } from "zustand";

export interface RequestDataState {
    dataState: any,
    setDataState: (data: any) => void
}

export const requestDataStore = create<RequestDataState>()((set) => ({
    dataState: undefined,
    setDataState: (data: any) => set(() => ({ dataState: data }))
}))