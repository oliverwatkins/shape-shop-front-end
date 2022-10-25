import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {fireEvent, logRoles, prettyDOM, render, screen, waitFor} from "@testing-library/react";
import OrderWizardContainer from "../OrderWizardContainer";

import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import {combineReducers, createStore} from "redux";
import {reducer as login} from "../../login/redux/loginReducer";
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
//
//     store.
// , getData()
    const mockStore = configureStore();

    // let store = mockStore(getData());

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

        // logRoles(container)

        //mains
        await testMains(container);

        let buttons: HTMLInputElement[] = await screen.findAllByRole("button");

        fireEvent.click(buttons[1]);


        /*********************
         * DRINKS
         * *******************
         */

        //drinks
        await testDrinks(container);

        // expect(screen.getByText(/main/i)).toBeInTheDocument()
        buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[1]);


        /*********************
         * ADDRESS
         * *******************/

        await screen.findAllByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?')

        buttons = await screen.findAllByRole("button");

        // let textBoxes: HTMLInputElement[] = await screen.findAllByRole('textbox');
        // expect(textBoxes.length).toBe(3);
        let textBoxes: HTMLInputElement[] = await screen.findAllByRole("textbox");
        expect(textBoxes.length).toBe(3);

        fireEvent.change(textBoxes[0], { target: { value: '123' } })
        fireEvent.change(textBoxes[1], { target: { value: '122323' } })
        fireEvent.change(textBoxes[2], { target: { value: '123@asdf.com' } })

        expect(buttons.length).toBe(3);
        fireEvent.click(buttons[2]);
        //TODO clicking on NEXT does not go to payment, but it should because fields are correctly filled.

        /*********************
         * PAYMENT
         * *******************/

        // await screen.findAllByRole('heading')
        //
        // expect(screen.getByRole('heading')).toHaveTextContent('How do you wish to pay?')

    });
})

// function Checkboxes(props) {
//     return (
//         <div>
//             <input className="item-box-checkbox-1" type="checkbox"/>
//             <input className="item-box-checkbox-2" type="checkbox"/>
//             <input className="item-box-checkbox-3" type="checkbox"/>
//             <input className="item-box-checkbox-4" type="checkbox"/>
//             ...
//         </div>
//     )
// }



async function testMains(container: HTMLElement) {


    /*********************
     * Check MAIN
     * *******************/
    let headings: HTMLElement[] = await screen.findAllByRole('heading')

    expect(headings[0].textContent).toBe("main");
    expect(headings[1].textContent).toBe("Order Summary");


    const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);

    // expect(screen.getByText(/main/i)).toBeInTheDocument()
    let buttons: HTMLInputElement[] = await screen.findAllByRole("button");
    expect(buttons.length).toBe(2);

    checkboxes.map(checkbox =>
        expect(checkbox.checked).toEqual(false)
    )

    let l = screen.queryByTestId("order-summary")
    // logRoles(screen)

    // console.info("" + screen.debug())


    // let orderSummary = container.querySelector('.order-summary')

    expect(l?.textContent).toContain("Nothing selected")


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


    expect(comboboxes[0].value).toEqual("3") // assert value 0
    // return buttons;


    console.info("*********************** TOTAL selects *********************** ")

    console.info("" + screen.debug(comboboxes[0]),300000)

    // headings = await screen.findAllByRole('heading')

    // let l = screen.getByText("Order Summary")

    // orderSummary = await screen.findByTitle("Order Summary");
    // orderSummary = container.querySelector('.order-summary')
    l = screen.queryByTestId("order-summary")
    // logRoles(screen)


    // const maxLengthToPrint = 100000
    // screen.debug();
    console.info("*********************** TOTAL SCREEN *********************** ")

    console.info("" + screen.debug(),300000)


    // let orderSummary = container.querySelector('.order-summary')

    expect(l?.textContent).toContain("Lachs-Lasagne")
    // expect(orderSummary?.textContent).toContain("Lachs-Lasagne")
    // screen.debug();
    // expect(screen.getByText('Total:')).toBeInTheDocument();

    //***************
    //Click checkbox TODO : NOT WORKING
    //***************

    // expect(checkboxes[0]).not.toBeChecked();

    // fireEvent.click(checkboxes[0]);
    //
    // const checkboxes2 = screen.getAllByRole('checkbox');
    //
    // console.log(prettyDOM(checkboxes2[0]))
    // const checked = await screen.findAllByRole('checkbox', {checked: true}) //hangs
    // expect(checked).toHaveLength(1);
    //
    // await waitFor(() => expect(checkboxes2[1]).toBeChecked())

    //click first checkbox
    // fireEvent.click(checkboxes[0]);
    //
    //
    // await waitFor(() => expect(checkboxes[0]).toBeChecked())

    // const checked = await screen.findAllByRole('checkbox', {checked: true})
    // expect(checked).toHaveLength(1);
    //check all checkboses unchecked
    // checkboxes.map(checkbox =>
    //     expect(checkbox.checked).toEqual(false)
    // )
    // await userEvent.click(checkboxes[0]);
}















async function testDrinks(container: HTMLElement) {

    // await screen.findAllByRole('heading')
    const headings2: HTMLElement[] = await screen.findAllByRole('heading')
    expect(headings2[0].textContent).toBe("drinks");
    expect(headings2[1].textContent).toBe("Order Summary");

    const labelRadio2: HTMLInputElement[] = await screen.findAllByRole('checkbox');
    // let elems = wrapper.find("input[type='radio']");
    expect(labelRadio2.length).toBe(4);

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
                    price: 22.7,
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
                    price: 22.7,
                    description: 'Lugana Villa Trendi, Gardasee 0,75 l',
                    imageFilename: 'wine4.jpg',
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
                        imageFilename: 'wine4.JPG',
                        description: 'Lugana Villa Trendi, Gardasee 0,75 l',
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


// let checkNoAddressFields = (wrapper) => {
//     let elems = wrapper.find(".paymentPanel");
//     expect(elems.length).toBe(0);
// }
//
// let checkAddressFieldsDoExist = (wrapper) => {
//     let elems = wrapper.find(".paymentPanel");
//     expect(elems.length).toBe(1);
// }

// const data = {
//     products: {
//         items: [
//             {
//                 name: "prod1",
//                 quantity: 1,
//                 price: 123,
//                 description: "asfd",
//                 type: "main",
//                 imageFilename: "",
//             },
//             {
//                 name: "prod2",
//                 quantity: 2,
//                 price: 124,
//                 description: "fasfdasfd",
//                 type: "drink",
//                 imageFilename: "",
//             },
//         ]
//     },
//     order: {
//         paymentType: "cash",
//         deliveryType: "pickup",
//         address: {
//             name: "fasdfas",
//             telephone: "1234444",
//             street: "asdfasdfasdf",
//             postcode: "sfdsd23",
//             username: "asdfasdf"
//         }
//     },
//     login: {
//         loginToken: "should something be here?",
//         role: "asfd",
//         loggingIn: false,
//     },
//     user: Function, //??
// };



