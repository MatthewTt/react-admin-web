import {useEffect, useRef} from "react";

 const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isMount = useRef(true);

    useEffect(
        isMount.current ?
            () => {
                isMount.current = false
            } : effect,
        deps
    )
}

export default useUpdateEffect