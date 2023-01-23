
import React from 'react';

import {useEffect, useState} from "react";
import useWindowsWidth from "./useWindowWidth";

/**
 * layout compoentn
 * @constructor
 */

const LayoutComponent = () => {

    let onSmallScreen = useWindowsWidth()


    // const [onSmallScreen, setOnSmallScreen] = useState(false);
    //
    // //onmount :
    // useEffect(() => {
    //     checkScreenSize();
    //
    //     //window resize
    //     window.addEventListener("resize", checkScreenSize);
    // }, []);
    //
    // //set true if small
    // let checkScreenSize = () => {
    //     setOnSmallScreen(window.innerWidth < 768);
    // };

    return (
        <div className={`${onSmallScreen ? "small" : "large"}`}>
            <h1>Hello World!</h1>
        </div>
    );
};