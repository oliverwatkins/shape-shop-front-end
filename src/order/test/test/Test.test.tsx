import React from 'react';
import {act, fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import Test from "./Test";



describe('Test', () => {

    it('tests a button click', async () => {

        render(<Test/>);

        await screen.findAllByRole('heading')

        let buttons = await screen.findAllByRole("button");

        await act(async () => {
            fireEvent.click(buttons[0]);
        });
        // fireEvent.click(buttons[0]);
    });
})



