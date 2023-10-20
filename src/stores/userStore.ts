import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface User {
    id: string;
    userName: string;
    nickName: string;
    mobile: string;
    email: string;
}

interface State {
    currentUser: User | null;
}

interface Action {
    setCurrentUser: (currentUser: State['currentUser']) => void;
}
export const useUserStore = create<State & Action>()(
    devtools(
        (set) => {
            return {
                currentUser: null,
                setCurrentUser: (currentUser) => set({currentUser})
            }
        },
        { name: 'userStore' }
    )
)
