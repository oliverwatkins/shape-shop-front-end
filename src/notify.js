import * as constants from "./constants";
import {toast} from "react-toastify";


export const Notify = {
    warn: (msg) => {
    },
    error: (msg) => {

        toast.error("ERROR : " + msg, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }
}