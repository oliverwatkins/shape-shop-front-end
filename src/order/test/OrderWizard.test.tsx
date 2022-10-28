import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {act, fireEvent, render, screen} from "@testing-library/react";
import OrderWizardContainer from "../OrderWizardContainer";

import '@testing-library/jest-dom';
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import {getData} from "./mockData";

export function createTestStore() {
    const store = createStore(
        combineReducers({
            // login: login,
            products: products,
            order: order,
            admin: admin
        }), getData()
    );
    return store;
}



describe('Payment Step test', () => {
    const store = createTestStore();

    xit('matches snapshot', () => {
        expect(render(<Provider store={store}>
            <MemoryRouter initialEntries={["/order/cat_main", ""]}>
                <OrderWizardContainer/>
            </MemoryRouter>
        </Provider>)).toMatchSnapshot();
    });

    it('Step through wizard from product list, to address, payment, and OK screen', async () => {

        const {container} = render(<Provider store={store}>
            <MemoryRouter initialEntries={["/order/cat_main", ""]}>
                <OrderWizardContainer/>
            </MemoryRouter>
        </Provider>)

        /*********************
         * Check MAIN
         * *******************/
        await testMains();

        let [backbutton, forwardButton] = await screen.findAllByRole("button");
        fireEvent.click(forwardButton);

        /*********************
         * DRINKS
         * *******************
         */
        await testDrinks();

        [backbutton, forwardButton] = await screen.findAllByRole("button");
        fireEvent.click(forwardButton);

        /*********************
         * CONTACT
         * *******************/
        await testContact();


        /*********************
         * PAYMENT
         *********************/
        await testWhichPayment();


        // await screen.findAllByRole('heading')
        //
        // expect(screen.getByRole('heading')).toHaveTextContent('How do you wish to pay?')

    });
})


function checkAllCheckboxesUnchecked(checkboxes: HTMLInputElement[]) {

    checkboxes.map(checkbox =>
        expect(checkbox.checked).toEqual(false)
    )
}

async function testWhichPayment() {
    let headings: HTMLElement[] = await screen.findAllByRole('heading')
    expect(headings[0].textContent).toBe("How do you wish to pay?");

    let [firstRadio, secondRadio]: HTMLElement[] = await screen.findAllByRole('radio')

    expect(firstRadio).toBeChecked()
    expect(secondRadio).not.toBeChecked()

    fireEvent.click(secondRadio);
    expect(firstRadio).not.toBeChecked()
    expect(secondRadio).toBeChecked()

    let [backButton, forwardButton]: HTMLElement[] = await screen.findAllByRole('button')
    fireEvent.click(forwardButton);

    let [SummaryHeading]: HTMLElement[] = await screen.findAllByRole('heading')
    expect(SummaryHeading.textContent).toBe("Summary");

    [backButton, forwardButton] = await screen.findAllByRole('button')
    expect(forwardButton.textContent).toBe("To Payment");
    //forward button must be "To Payment" button
    fireEvent.click(backButton);

    [SummaryHeading] = await screen.findAllByRole('heading')
    expect(SummaryHeading.textContent).toBe("How do you wish to pay?");

    [firstRadio, secondRadio] = await screen.findAllByRole('radio')
    fireEvent.click(firstRadio);

    [backButton, forwardButton] = await screen.findAllByRole('button')
    fireEvent.click(forwardButton);

    [SummaryHeading] = await screen.findAllByRole('heading')
    expect(SummaryHeading.textContent).toBe("Summary");
    [backButton, forwardButton] = await screen.findAllByRole('button')
    fireEvent.click(forwardButton);
    //forward button must be "OK" button now
    expect(forwardButton.textContent).toBe("OK");

    fireEvent.click(backButton);
}


async function testMains() {


    let headings: HTMLElement[] = await screen.findAllByRole('heading')
    expect(headings[0].textContent).toBe("main");
    expect(headings[1].textContent).toBe("Order Summary");


    //all checkboxes unchecked
    let checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    checkAllCheckboxesUnchecked(checkboxes);

    // 2 buttons (back and forward)
    let buttons: HTMLInputElement[] = await screen.findAllByRole("button");
    expect(buttons.length).toBe(2);

    let orderSummary = screen.queryByTestId("order-summary")

    expect(orderSummary?.textContent).toContain("Nothing selected")

    //***************
    //Select Combo
    //***************
    let comboboxes: HTMLInputElement[] = await screen.findAllByRole("combobox");
    expect(comboboxes.length).toBe(2);

    comboboxes.map(combo =>
        expect(combo.value).toEqual("0") // assert value 0
    )

    fireEvent.change(comboboxes[0], {target: {value: "3"}})

    comboboxes = await screen.findAllByRole("combobox");

    expect(comboboxes[0].value).toEqual("3")

    orderSummary = screen.queryByTestId("order-summary")

    expect(orderSummary?.textContent).toContain("Lachs-Lasagne")
    expect(orderSummary?.textContent).toContain("Total:32.70") //3x lasagna (10,90)

    //check first checkbox checked
    checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    checkboxes.map((checkbox, i) => {
        if ( i == 0)
            expect(checkbox.checked).toEqual(true)
        else
            expect(checkbox.checked).toEqual(false)
        }
    )

}


async function testDrinks() {

    const headings2: HTMLElement[] = await screen.findAllByRole('heading')
    expect(headings2[0].textContent).toBe("drinks");
    expect(headings2[1].textContent).toBe("Order Summary");
    let checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);

    //select a product with checkbox
    fireEvent.click(checkboxes[1]);
    checkboxes = await screen.findAllByRole('checkbox');
    checkboxes.map((checkbox, i) => {
            if ( i == 1)
                expect(checkbox.checked).toEqual(true)
            else
                expect(checkbox.checked).toEqual(false)
        }
    )

    let orderSummary = screen.queryByTestId("order-summary")
    expect(orderSummary?.textContent).toContain("Lachs-Lasagne")
    expect(orderSummary?.textContent).toContain("Beer")
    expect(orderSummary?.textContent).toContain("Total:53.20") //3x lasagna (10,90) + 1x beer (20.5)

}

async function testContact() {

    await screen.findAllByRole('heading')
    expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?');

    let [backbutton, forwardButton] = await screen.findAllByRole("button");

    let textBoxes: HTMLInputElement[] = await screen.findAllByRole("textbox");
    expect(textBoxes.length).toBe(3);

    fireEvent.change(textBoxes[0], {target: {value: 'bob'}})
    // required field "telephone" is left empty
    fireEvent.change(textBoxes[2], {target: {value: '123@asdf.com'}})

    await act(async () => {
        fireEvent.click(forwardButton);
    });

    //Will NOT move to the next screen, because the form is not yet valid.
    await screen.findAllByRole('heading')
    expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?');

    fireEvent.change(textBoxes[0], {target: {value: 'bob'}})
    fireEvent.change(textBoxes[1], {target: {value: '018012333'}})
    fireEvent.change(textBoxes[2], {target: {value: '123@asdf.com'}})


    /**
     * Use "act" to make it resemble more how it works in the browser :
     *
     * "This makes your test run closer to how React works in the browser"
     */
    await act(async () => {
        fireEvent.click(forwardButton);
    });

    // now we are in the next screen
    await screen.findAllByRole('heading')
    expect(screen.getByRole('heading')).toHaveTextContent('How do you wish to pay?');
}