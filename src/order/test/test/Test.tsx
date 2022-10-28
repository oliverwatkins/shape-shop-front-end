import * as React from 'react';

import {useForm} from "react-hook-form";

export default function Test() {

    const { handleSubmit } = useForm();

    const [foobar, setFoobar] = React.useState<string>("foo");

    if (foobar) {
        console.info("this will never get called if onSubmit is called from handleSubmit")
    }

    const onSubmit = () => {
        setFoobar("bar")
    }
    return (
        <>
            <h1>Test</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button type={"submit"}>Hi</button>
            </form>
            {/*<button onClick={()=>onSubmit()}>Hi</button>*/}
        </>
    );
}
