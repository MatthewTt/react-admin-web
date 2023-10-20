import {useEffect} from "react";
import nprogress from "nprogress";
import {Spin} from "antd";


nprogress.configure({
    showSpinner: false
})
export const Loading: React.FC = () => {
    useEffect(() => {
        nprogress.start()
        return () => {
            nprogress.done()
        }
    }, [])
    return (
        <div className='flex justify-center pt-18'>
            <Spin size='large'/>
        </div>
    )
}