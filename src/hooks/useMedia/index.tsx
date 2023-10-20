import {useEffect, useState} from "react";

export const useMedia = (query: string) => {
    const [state, setState] = useState(false)

    useEffect(() => {
        let mounted = true
        const mql = window.matchMedia(query)

        // 设置监听时间
        const onChange = () => {
            if (!mounted) return
            setState(mql.matches)
        }

        mql.addEventListener('change', onChange)
        // 初始化默认值
        setState(mql.matches)

        return () => {
            mounted = false
            mql.removeEventListener('change', onChange)
        }
    }, [query])

    return state
}