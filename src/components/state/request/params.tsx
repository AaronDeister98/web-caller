import { create } from "zustand";
import { Param } from "../../../structures/components";


export interface ParamsState {
    paramsState: Param[]
    setParamsState: (params: Param[]) => void
}

export const paramsStore = create<ParamsState>()((set) => ({
    paramsState: [{ key: "", value: "" }],
    setParamsState: (attrs: Param[]) => set(() => ({ paramsState: [...attrs] }))
}))
