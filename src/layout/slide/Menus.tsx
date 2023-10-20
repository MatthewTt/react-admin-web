import {Menu, MenuProps} from "antd";
import React from "react";
import {Link} from "react-router-dom";
import {DesktopOutlined, PieChartOutlined} from "@ant-design/icons";
import {useGlobalStore} from "@/stores/globalStore.ts";
import useIsMobile from "@/hooks/useDevices/useIsMobile.tsx";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

type MenuDataItem = {
    name: string;
    key: string;
}
const getMenuTitle = (item: MenuDataItem) => {
    return (
        <Link to={item.key}>{item.name}</Link>
    )
}

const items: MenuItem[] = [
    getItem(getMenuTitle({name: '首页', key: '/'}), '1', <PieChartOutlined/>),
    getItem(getMenuTitle({name: 'home', key: '/home'}), '2', <DesktopOutlined/>),
    getItem(getMenuTitle({name: '用户', key: '/user'}), '3', <DesktopOutlined/>),
];


function Menus({style}: { style?: React.CSSProperties }) {
    const isMobile = useIsMobile();
    const { setDrawerVisible } = useGlobalStore();
    const handleClick = () => {
        if (isMobile) {
            setDrawerVisible(false)
        }
    }
    return (
        <Menu
            mode="inline"
            theme="light"
            items={items}
            style={style}
            onClick={handleClick}
        />
    )
}

export default Menus