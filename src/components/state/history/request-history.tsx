import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface RequestHistoryState {
    requestHistoryState: Record<string, AxiosResponse>[]
    setRequestHistoryState: (history: Record<string, AxiosResponse>[]) => void
}

export const requestHistoryStore = create<RequestHistoryState>()((set) => ({
    requestHistoryState: [],
    setRequestHistoryState: (attrs: Record<string, AxiosResponse>[]) => set(() => ({ requestHistoryState: [...attrs] }))
}))