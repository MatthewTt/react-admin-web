import React, {Suspense, useEffect} from 'react';
import {ConfigProvider, Layout} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import Slide from "@/layout/slide";
import {BaseHeader} from "@/layout/header";
import {useGlobalStore} from "@/stores/globalStore.ts";
import {Loading} from "@/components/Loading";
import {useRequest} from "ahooks";
import userService from "@/pages/user/service.ts";
import {useUserStore} from "@/stores/userStore.ts";

const {Sider, Content} = Layout;


const contentStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 64px)',
}
const componentToken = {
    components: {
        Layout: {
            headerBg: '#fff',
            headerPadding: '0 20px',
        }
    }
}

const App: React.FC = () => {
    const {menuCollapsed, drawerVisible, refreshToken} = useGlobalStore();
    const { setCurrentUser } = useUserStore();
    const {data: currentUser, run: getCurrentUser} = useRequest(userService.getUserById, {manual: true});
    const navigate = useNavigate();
    useEffect(() => {
        if (!refreshToken) {
            return navigate('/login')
        }
        getCurrentUser()
    }, [refreshToken, getCurrentUser, navigate]);

    useEffect(() => {
        setCurrentUser(currentUser?.data || null)
    }, [currentUser, setCurrentUser]);

    useEffect(() => {
        function storageChange(e: StorageEvent) {
            if (e.key === useGlobalStore.persist.getOptions().name) {
                useGlobalStore.persist.rehydrate()
            }
        }

        window.addEventListener('storage', storageChange)
        return () => {
            window.removeEventListener('storage', storageChange)
        }
    }, []);
    return (
        <>
            <ConfigProvider
                theme={componentToken}
            >
                <Layout>
                    <Sider theme="light" collapsed={drawerVisible ? false : menuCollapsed} className='<md:hidden'>
                        <Slide/>
                    </Sider>
                    <Layout>
                        <BaseHeader/>
                        <Content style={contentStyle}>
                            <Suspense fallback={<Loading/>}>
                                <Outlet/>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    )
};

export default App;
