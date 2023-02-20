
import * as React from "react";

type Props = {
    message: string
}

export const ErrorPanel = (props: Props) => {
    return (
        <span className="error" >{props.message} </span>
    );
};