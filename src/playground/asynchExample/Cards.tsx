
import { useEffect } from "react";
import { useAsync } from "react-async-hook";

import { getTests } from "./service";import React from "react";

export type Test = {}

const TestComponent = () => {
    // const { state, setC, setTests } = useCardContext();

    const {
        loading: cardLoading,
        error: cardError,
        result: cards = null,
    } = useAsync<Test[]>(getTests, []);


    useEffect(() => {
        if (cards) {
            // setAllCards(cards); if using context

            // dispatch(); if using redux
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards]);

    return (<div>d</div>);
};


export default TestComponent;
