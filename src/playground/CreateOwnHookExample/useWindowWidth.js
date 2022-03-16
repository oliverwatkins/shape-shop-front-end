import {useEffect, useState} from "react";

const useWindowsWidth = () => {


    const [onSmallScreen, setOnSmallScreen] = useState(false);

    let checkScreenSize = () => {
        setOnSmallScreen(window.innerWidth < 768);
    };

    useEffect(() => {
        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    return onSmallScreen;
}

export default useWindowsWidth;

