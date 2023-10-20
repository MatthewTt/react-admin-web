import {useMedia} from "@/hooks/useMedia";

const useIsPad = () => {
    return useMedia('(min-width: 1024px) and (max-width: 1439px)')
};

export default useIsPad