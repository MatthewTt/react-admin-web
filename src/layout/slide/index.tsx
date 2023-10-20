import {memo} from "react";
import {useGlobalStore} from "@/stores/globalStore.ts";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import Menus from "@/layout/slide/Menus.tsx";
import {Drawer} from "antd";
import useIsPc from "@/hooks/useDevices/useIsPc.tsx";
import useIsMobile from "@/hooks/useDevices/useIsMobile.tsx";


const Slide = () => {
    const isMobile = useIsMobile();
    const isPc = useIsPc();
    const {setMenuCollapsed, setDrawerVisible, drawerVisible} = useGlobalStore();
    useUpdateEffect(() => {
        if (isPc) {
            setMenuCollapsed(false);
            setDrawerVisible(false);
        } else {
            setMenuCollapsed(true);
        }
    }, [isPc]);


    function renderMenu() {
        return (
            <Menus style={{ border: 'none'}}/>
        )
    }

    if (isMobile) {
        return (
            <Drawer placement="left" closable={false} onClose={() => setDrawerVisible(false)} open={drawerVisible}
                    headerStyle={{padding: '24px 0', border: 'none'}}
                    bodyStyle={{padding: '0 16px'}}>
                {renderMenu()}
            </Drawer>
        )
    }

    return (
        <>
            <div className={'text-lg text-center my-4'}>logo</div>
            {renderMenu()}
        </>
    )
}

export default memo(Slide);