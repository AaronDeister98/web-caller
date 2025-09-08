import { create } from "zustand"
import { SideBarButtonOption } from "../../structures/components"


export interface InterfaceVisibilityState {
    activeInterface: SideBarButtonOption
    setActiveInterface: (item: SideBarButtonOption) => void
}

export const interfaceVisibilityStore = create<InterfaceVisibilityState>()((set) => ({
    activeInterface: SideBarButtonOption.Workbench,
    setActiveInterface: (item: SideBarButtonOption) => set(() => ({ activeInterface: item }))
}))