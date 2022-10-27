import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import Test from "./Test";



describe('Test', () => {

    it('tests a button click', async () => {

        render(<Test/>);

        await screen.findAllByRole('heading')

        let buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[0]);
    });
})



