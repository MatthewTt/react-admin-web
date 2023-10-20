import {useGlobalStore} from "@/stores/globalStore.ts";
import {Navigate} from "react-router-dom";
import {ReactElement} from "react";

const AuthRoute = ({children}: { children: ReactElement }) => {
    const {token} = useGlobalStore();
    if (token) {
        return children
    }
    return <Navigate to='/login' replace/>
}

export default AuthRoute
