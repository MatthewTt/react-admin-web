import React, {memo} from "react";
import {Button, Dropdown, Layout} from "antd";
import {SettingOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useGlobalStore} from "@/stores/globalStore.ts";
import useIsMobile from "@/hooks/useDevices/useIsMobile.tsx";
import {useRequest} from "ahooks";
import {loginServices} from "@/pages/login/service.ts";
import {useUserStore} from "@/stores/userStore.ts";

const {Header} = Layout;


export const BaseHeader: React.FC = memo(() => {
    const { setMenuCollapsed, menuCollapsed, setDrawerVisible, setToken, setRefreshToken } = useGlobalStore();
    const { currentUser} = useUserStore();
    const { runAsync } = useRequest(loginServices.logout, {manual: true});
    const isMobile = useIsMobile();
    const handleMenuCollapsed = () => {
        isMobile ? setDrawerVisible(true) : setMenuCollapsed(!menuCollapsed)
    }

    const logout = async () => {
        const { error } = await runAsync();
        if (error) return
        setToken('')
        setRefreshToken('')
    }
    return (
        <Header className='flex items-center justify-between'>
            <span className='btn-icon-purple' onClick={handleMenuCollapsed}>
                <UnorderedListOutlined />
            </span>
            <div>
                <Dropdown className="btn-icon-lightblue w-[100px] rounded-full" trigger={['click']} dropdownRender={() => {
                    return (
                        <>
                            <div className='bg-white rounded w-50' style={{ boxShadow: 'rgba(0,0,0,0.1) 0 5px 30px'}}>
                                <div className="p4">
                                    <div className='text-base'>管理员</div>
                                    <div>{currentUser?.email}</div>
                                </div>
                                <hr className='border-solid border-gray-100 border-1'/>
                                <div className='p3 text-center'>
                                    <Button type='text' onClick={logout}>退出登录</Button>
                                </div>
                            </div>
                        </>
                    )
                }}>
                    <SettingOutlined />
                </Dropdown>
            </div>

        </Header>
    )
})
