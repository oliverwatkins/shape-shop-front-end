import * as constants from "./constants";
import {toast} from "react-toastify";


export const Notify = {
    warn: (msg: string) => {
    },
    error: (msg: string) => {
        toast.error("ERROR : " + msg, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    success: (msg: string) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 800000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}