import React from "react";
import {ssContext} from "./Context";
// import { lxContext } from "@lxo-blocks/react";

// actions
export const BlobActionOrderReplacement = "BlobActionOrderReplacement";

const defaultState = {
    selectedBlob: null,
    selectedActionPage: null,
    blobs: [],
    showClosed: false,
};

export function blobStateReducer(currentState, action) {

    switch (action.type) {
        case "One":

        case "Two":

    }
    return currentState;
}

export const [BlobContext, useBlobContext] = ssContext(() => {
    const [state, dispatch] = React.useReducer(blobStateReducer, defaultState);

    const setSelectBlob = (blob) =>
        dispatch({ type: "One", value: blob });

    const setShowClosedPanel = (value) =>
        dispatch({ type: "Two", value: value });

    return {
        state,
        dispatch,
        setSelectBlob,
        setShowClosedPanel
    };
});
