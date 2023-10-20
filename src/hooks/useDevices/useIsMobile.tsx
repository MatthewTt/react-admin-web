import {useMedia} from "@/hooks/useMedia";

const useIsMobile = () => {
    return useMedia('(max-width: 767px)');
};

export default useIsMobile