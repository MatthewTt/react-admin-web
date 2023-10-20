import {create} from "zustand";
import {persist, createJSONStorage, devtools} from "zustand/middleware";


interface State {
    /**
     * 菜单是否折叠
     */
    menuCollapsed: boolean
    drawerVisible: boolean,
    /**
     * token
     */
    token: string
    refreshToken: string
}

interface Actions {
    /**
     * 设置菜单折叠状态
     * @param collapsed
     */
    setMenuCollapsed: (collapsed: boolean) => void
    setDrawerVisible: (visible: boolean) => void
    setToken: (token: string) => void
    setRefreshToken: (token: string) => void
}

export const useGlobalStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                menuCollapsed: false,
                drawerVisible: false,
                setMenuCollapsed: (collapsed) => set({menuCollapsed: collapsed}),
                setDrawerVisible: (visible) => set({drawerVisible: visible}),
                token: '',
                refreshToken: '',
                setToken: (token) => set({token}),
                setRefreshToken: (refreshToken) => set({refreshToken})
            }), {
                name: 'globalStore',
                storage: createJSONStorage(() => localStorage)
            })
    )
)