import {createHashRouter, RouterProvider} from "react-router-dom";
import {lazy} from "react";
import result404 from "../404";
import BasicLayout from "../layout";
import AuthRoute from "@/components/AuthRoute";

export const router = createHashRouter([
    {
        path: "/",
        element: (<AuthRoute>
                    <BasicLayout/>
                </AuthRoute>)
            ,
        children: [
            {
                path: "/",
                Component: lazy(() => import("../pages/dashboard")),
            },
            {
                path: '/home',
                Component: lazy(() => import('../pages/home')),
            },
            {
                path: '/user',
                Component: lazy(() => import('../pages/user')),
            },

        ]
    },
    {
        path: '/login',
        Component: lazy(() => import('../pages/login'))
    },
    {
        path: '*',
        Component: result404,
    }
])

const Router = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default Router
