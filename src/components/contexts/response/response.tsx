import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface ResponseState {
    responseState: AxiosResponse | undefined
    setResponseState: (response: AxiosResponse) => void
}

export const responseStore = create<ResponseState>()((set) => ({
    responseState: undefined,
    setResponseState: (attrs: AxiosResponse) => set(() => ({ responseState: attrs }))
}))