import { create } from "zustand";
import { Header } from "../../../structures/components";

export interface HeadersState {
    headersState: Header[]
    setHeadersState: (headers: Header[]) => void
}

export const headersStore = create<HeadersState>()((set) => ({
    headersState: [{ key: "", value: "" }],
    setHeadersState: (attrs: Header[]) => set(() => ({ headersState: [...attrs] }))
}))
