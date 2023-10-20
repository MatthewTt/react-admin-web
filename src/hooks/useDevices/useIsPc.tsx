import {useMedia} from "@/hooks/useMedia";

const useIsPc = () => {
    return useMedia('(min-width: 1240px')
};

export default useIsPc