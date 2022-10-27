import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import OrderWizardContainer from "../OrderWizardContainer";

import '@testing-library/jest-dom';
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import {AppState} from "../../AppState";

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


        //mains
        await testMains(container);

        let [backbutton, forwardButton] = await screen.findAllByRole("button");
        fireEvent.click(forwardButton);

        /*********************
         * DRINKS
         * *******************
         */

        //drinks
        await testDrinks(container);

        [backbutton, forwardButton] = await screen.findAllByRole("button");
        fireEvent.click(forwardButton);

        /*********************
         * ADDRESS
         * *******************/

        await screen.findAllByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?');

        [backbutton, forwardButton] = await screen.findAllByRole("button");

        // let textBoxes: HTMLInputElement[] = await screen.findAllByRole('textbox');
        // expect(textBoxes.length).toBe(3);
        let textBoxes: HTMLInputElement[] = await screen.findAllByRole("textbox");
        expect(textBoxes.length).toBe(3);

        fireEvent.change(textBoxes[0], { target: { value: '123' } })
        fireEvent.change(textBoxes[1], { target: { value: '122323' } })
        fireEvent.change(textBoxes[2], { target: { value: '123@asdf.com' } })

        let buttons = await screen.findAllByRole("button");
        expect(buttons.length).toBe(2); // should be two
        fireEvent.click(buttons[1]);
        //TODO clicking on NEXT does not go to payment, but it should because fields are correctly filled.

        /*********************
         * PAYMENT
         * *******************/

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

async function testMains(container: HTMLElement) {

    /*********************
     * Check MAIN
     * *******************/
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


async function testDrinks(container: HTMLElement) {

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
function getData(): AppState {
    return {

        login: {
            loggingIn: false,
            loginToken: {
                username: "itdoesntmatter",
                token: "itdoesntmatter",
            },
            // logout: 'IN_PROGRESS'
        },
        products: {
            categories: [
                {
                    id: "1",
                    name: 'main'
                },
                {
                    id: "2",
                    name: 'drinks'
                }
            ],
            allProducts: [
                {
                    id: "13",
                    name: 'Lachs-Lasagne',
                    price: 10.9,
                    description: 'Lachs-Spinat-Lasagne',
                    imageFilename: 'lachs_spinat.jpg',
                    categories: [
                        {
                            id: "1",
                            name: 'main'
                        }
                    ]
                },
                {
                    id: "14",
                    name: 'Calamari',
                    price: 4.5,
                    description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree',
                    imageFilename: 'calamari.jpg',
                    categories: [
                        {
                            id: "1",
                            name: 'main'
                        }
                    ]
                },
                {
                    id: "30",
                    name: 'Wine',
                    price: 16.3,
                    description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l',
                    imageFilename: 'wine3.jpg',
                    categories: [
                        {
                            id: "2",
                            name: 'drinks'
                        }
                    ]
                },
                {
                    id: "31",
                    name: 'Beer',
                    price: 20.5,
                    description: 'biaar',
                    imageFilename: 'beer.jpg',
                    categories: [
                        {
                            id: "2",
                            name: 'drinks'
                        }
                    ]
                }
            ],
            productsError: '',
            updatingProduct: false,
            categoryProducts: {
                main: [
                    {
                        id: "13",
                        name: 'Lachs-Lasagne',
                        price: 10.9,
                        imageFilename: 'lachs_spinat.jpg',
                        description: 'Lachs-Spinat-Lasagne'
                    },
                    {
                        id: "14",
                        name: 'Calamari',
                        price: 4.5,
                        imageFilename: 'calamari.jpg',
                        description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree'
                    },

                ],
                drinks: [
                    {
                        id: "30",
                        name: 'Wine',
                        price: 16.3,
                        imageFilename: 'wine3.jpg',
                        description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l',
                    },
                    {
                        id: "31",
                        name: 'Beer',
                        price: 20.5,
                        imageFilename: 'beer.JPG',
                        description: 'biaar',
                    }
                ]
            }
        },
        order: {
            orderItems: [],
            selectedProducts: [],
            // orderState: 'OPEN',
            // paymentType: 'CASH',
            // deliveryType: 'PICKUP'
        },
        admin: {
            orders: []
        },
    }
}


