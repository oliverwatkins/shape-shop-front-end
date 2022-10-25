import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {fireEvent, logRoles, prettyDOM, render, screen, waitFor} from "@testing-library/react";
import OrderWizardContainer from "../OrderWizardContainer";

import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";


describe('Payment Step test', () => {
    const mockStore = configureStore();

    let store = mockStore(getData());

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

        logRoles(container)

        await testMains(container);

        let buttons: HTMLInputElement[] = await screen.findAllByRole("button");



        fireEvent.click(buttons[1]);

        console.info("xx")

        /*********************
         * DRINKS
         * *******************
         */

        // await screen.findAllByRole('heading')
        const headings2: HTMLElement[] = await screen.findAllByRole('heading')
        expect(headings2[0].textContent).toBe("drinks");
        expect(headings2[1].textContent).toBe("Order Summary");

        const labelRadio2: HTMLInputElement[] = await screen.findAllByRole('checkbox');
        // let elems = wrapper.find("input[type='radio']");
        expect(labelRadio2.length).toBe(4);

        // expect(screen.getByText(/main/i)).toBeInTheDocument()
        buttons = await screen.findAllByRole("button"); //????

        expect(buttons.length).toBe(2);
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


    // TODO check


    const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(15);

    // expect(screen.getByText(/main/i)).toBeInTheDocument()
    let buttons: HTMLInputElement[] = await screen.findAllByRole("button");
    expect(buttons.length).toBe(2);

    checkboxes.map(checkbox =>
        expect(checkbox.checked).toEqual(false)
    )

    // logRoles(screen)

    console.info("" + screen.debug())


    let orderSummary = container.querySelector('.order-summary')

    expect(orderSummary?.textContent).toContain("Nothing selected")


    //***************
    //Select Combo
    //***************
    let selects: HTMLInputElement[] = await screen.findAllByRole("combobox");
    expect(selects.length).toBe(15);

    selects.map(combo =>
        expect(combo.value).toEqual("0") // assert value 0
    )

    fireEvent.change(selects[0], {target: {value: "2"}})

    selects = await screen.findAllByRole("combobox");
    expect(selects[0].value).toEqual("2") // assert value 0
    // return buttons;


    headings = await screen.findAllByRole('heading')

    // let l = screen.getByText("Order Summary")

    // orderSummary = await screen.findByTitle("Order Summary");
    // orderSummary = container.querySelector('.order-summary')

    // expect(orderSummary?.textContent).toContain("Lachs-Lasagne")
    //***************
    //Click checkbox
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

function getData() {
    return {

        login: {
            loggingIn: false,
            loginToken: {},
            logout: 'IN_PROGRESS'
        },
        products: {
            categories: [
                {
                    id: 1,
                    name: 'main'
                },
                {
                    id: 2,
                    name: 'drinks'
                }
            ],
            allProducts: [
                {
                    id: 13,
                    name: 'Lachs-Lasagne',
                    price: 10.9,
                    description: 'Lachs-Spinat-Lasagne',
                    imageFilename: 'lachs_spinat.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 14,
                    name: 'Calamari',
                    price: 4.5,
                    description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree',
                    imageFilename: 'calamari.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 15,
                    name: 'Minestone',
                    price: 10.9,
                    description: 'Minestone - italienische GemÃ¼sesuppe mit Basilikumpesto',
                    imageFilename: 'minestrone.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 16,
                    name: 'Zucchiniroellchen',
                    price: 7.9,
                    description: 'ZucchinirÃ¶llchen gefÃ¼llt mit ZiegenkÃ¤se und Honig auf Rucolasalat mit Roten Beten und gerÃ¶steten Mandeln',
                    imageFilename: 'zucchini_rolls.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 17,
                    name: 'Lasagna',
                    price: 10.9,
                    description: 'Lasagna Classica al Forno mit Hackfleisch',
                    imageFilename: 'lasagne.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 18,
                    name: 'Ravioli',
                    price: 4.5,
                    description: 'Ravioli gefÃ¼llt mit BÃ¤rlauch und Ricotta in Zitronenbutter mit Spargel',
                    imageFilename: 'ravioli.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 19,
                    name: 'Gnocchi',
                    price: 10.9,
                    description: 'Hausgemachte Rosmarin-Gnocchi mit Hirschragout',
                    imageFilename: 'gnocchi.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 20,
                    name: 'Fritto misto di Verdura',
                    price: 4.5,
                    description: 'Fritto misto di Verdura â€“ frittierter Blumenkohl, Zucchini, Champignons, Paprika, Aubergine und Artischockenherz mit Knoblauchmayonnaise und KrÃ¤uterkartoffeln',
                    imageFilename: 'fritto.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 21,
                    name: 'Pizza 1',
                    price: 10.9,
                    description: 'Pizza mit grÃ¼nem und WeiÃŸem Spargel und Kirschtomaten',
                    imageFilename: 'pizza_spargel.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 22,
                    name: 'Pizza 2',
                    price: 4.5,
                    description: 'Pizza mit Mortadella, Burrata und TrÃ¼ffelcreme',
                    imageFilename: 'pizza_mort.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 23,
                    name: 'Pizza 3',
                    price: 13.9,
                    description: 'Pizza mit Kirschtomaten, Burrata und Basilikum-Pesto',
                    imageFilename: 'pizza_cherry.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 24,
                    name: 'Saltimbocca',
                    price: 13.9,
                    description: 'Saltimbocca alla Romana â€“ Kalbslendenmedaillons mit Salbei und Parmaschinken in WeiÃŸweinsauce, dazu Kartoffel-GemÃ¼se-Gratin',
                    imageFilename: 'veal_parma.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 25,
                    name: 'Gegrillte Spiesse ',
                    price: 13.9,
                    description: 'Gegrillte SpieÃŸe mit Salsiccia, HÃ¤hnchenbrust, Rinderlende und Zwiebeln, dazu hausgemachte Barbecuesauce und KrÃ¤uterkartoffeln',
                    imageFilename: 'spiesse.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 26,
                    name: 'Fritto Misto di Pesce',
                    price: 13.9,
                    description: 'Fritto Misto di Pesce -  frittierte Fische und MeeresfrÃ¼chte mit Knoblauch-Mayonnaise und KrÃ¤uterkartoffeln',
                    imageFilename: 'grilledfish.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 27,
                    name: 'Erdbeersalat',
                    price: 4.5,
                    description: 'Mango-Panna Cotta mit Erdbeersalat',
                    imageFilename: 'straw_salad.jpg',
                    categories: [
                        {
                            id: 1,
                            name: 'main'
                        }
                    ]
                },
                {
                    id: 28,
                    name: 'Grillo',
                    price: 16.3,
                    description: 'Grillo \'\'Lustru\'\' IGP Cantine Europa, Sizilien 0,75 l',
                    imageFilename: 'wine1.jpg',
                    categories: [
                        {
                            id: 2,
                            name: 'drinks'
                        }
                    ]
                },
                {
                    id: 29,
                    name: 'Sauvignon',
                    price: 20.5,
                    description: 'Sauvignon â€˜Matusinâ€™ Walter Nardin, Veneto 0,75 l',
                    imageFilename: 'wine2.JPG',
                    categories: [
                        {
                            id: 2,
                            name: 'drinks'
                        }
                    ]
                },
                {
                    id: 30,
                    name: 'Grauburgunder Weingut',
                    price: 22.7,
                    description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l',
                    imageFilename: 'wine3.jpg',
                    categories: [
                        {
                            id: 2,
                            name: 'drinks'
                        }
                    ]
                },
                {
                    id: 31,
                    name: 'Lugana Villa',
                    price: 22.7,
                    description: 'Lugana Villa Trendi, Gardasee 0,75 l',
                    imageFilename: 'wine4.jpg',
                    categories: [
                        {
                            id: 2,
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
                        id: 13,
                        name: 'Lachs-Lasagne',
                        price: 10.9,
                        imageFilename: 'lachs_spinat.jpg',
                        description: 'Lachs-Spinat-Lasagne'
                    },
                    {
                        id: 14,
                        name: 'Calamari',
                        price: 4.5,
                        imageFilename: 'calamari.jpg',
                        description: 'Gegrillte Calamari gefÃ¼llt mit Zucchini und Paprika auf Aurberginen-PÃ¼ree'
                    },
                    {
                        id: 15,
                        name: 'Minestone',
                        price: 10.9,
                        imageFilename: 'minestrone.jpg',
                        description: 'Minestone - italienische GemÃ¼sesuppe mit Basilikumpesto'
                    },
                    {
                        id: 16,
                        name: 'Zucchiniroellchen',
                        price: 7.9,
                        imageFilename: 'zucchini_rolls.jpg',
                        description: 'ZucchinirÃ¶llchen gefÃ¼llt mit ZiegenkÃ¤se und Honig auf Rucolasalat mit Roten Beten und gerÃ¶steten Mandeln'
                    },
                    {
                        id: 17,
                        name: 'Lasagna',
                        price: 10.9,
                        imageFilename: 'lasagne.jpg',
                        description: 'Lasagna Classica al Forno mit Hackfleisch'
                    },
                    {
                        id: 18,
                        name: 'Ravioli',
                        price: 4.5,
                        imageFilename: 'ravioli.jpg',
                        description: 'Ravioli gefÃ¼llt mit BÃ¤rlauch und Ricotta in Zitronenbutter mit Spargel'
                    },
                    {
                        id: 19,
                        name: 'Gnocchi',
                        price: 10.9,
                        imageFilename: 'gnocchi.jpg',
                        description: 'Hausgemachte Rosmarin-Gnocchi mit Hirschragout'
                    },
                    {
                        id: 20,
                        name: 'Fritto misto di Verdura',
                        price: 4.5,
                        imageFilename: 'fritto.jpg',
                        description: 'Fritto misto di Verdura â€“ frittierter Blumenkohl, Zucchini, Champignons, Paprika, Aubergine und Artischockenherz mit Knoblauchmayonnaise und KrÃ¤uterkartoffeln'
                    },
                    {
                        id: 21,
                        name: 'Pizza 1',
                        price: 10.9,
                        imageFilename: 'pizza_spargel.jpg',
                        description: 'Pizza mit grÃ¼nem und WeiÃŸem Spargel und Kirschtomaten'
                    },
                    {
                        id: 22,
                        name: 'Pizza 2',
                        price: 4.5,
                        imageFilename: 'pizza_mort.jpg',
                        description: 'Pizza mit Mortadella, Burrata und TrÃ¼ffelcreme'
                    },
                    {
                        id: 23,
                        name: 'Pizza 3',
                        price: 13.9,
                        imageFilename: 'pizza_cherry.jpg',
                        description: 'Pizza mit Kirschtomaten, Burrata und Basilikum-Pesto'
                    },
                    {
                        id: 24,
                        name: 'Saltimbocca',
                        price: 13.9,
                        imageFilename: 'veal_parma.jpg',
                        description: 'Saltimbocca alla Romana â€“ Kalbslendenmedaillons mit Salbei und Parmaschinken in WeiÃŸweinsauce, dazu Kartoffel-GemÃ¼se-Gratin'
                    },
                    {
                        id: 25,
                        name: 'Gegrillte Spiesse ',
                        price: 13.9,
                        imageFilename: 'spiesse.jpg',
                        description: 'Gegrillte SpieÃŸe mit Salsiccia, HÃ¤hnchenbrust, Rinderlende und Zwiebeln, dazu hausgemachte Barbecuesauce und KrÃ¤uterkartoffeln'
                    },
                    {
                        id: 26,
                        name: 'Fritto Misto di Pesce',
                        price: 13.9,
                        imageFilename: 'grilledfish.jpg',
                        description: 'Fritto Misto di Pesce -  frittierte Fische und MeeresfrÃ¼chte mit Knoblauch-Mayonnaise und KrÃ¤uterkartoffeln'
                    },
                    {
                        id: 27,
                        name: 'Erdbeersalat',
                        price: 4.5,
                        imageFilename: 'straw_salad.jpg',
                        description: 'Mango-Panna Cotta mit Erdbeersalat'
                    }
                ],
                drinks: [
                    {
                        id: 28,
                        name: 'Grillo',
                        price: 16.3,
                        imageFilename: 'wine1.jpg',
                        description: 'Grillo \'\'Lustru\'\' IGP Cantine Europa, Sizilien 0,75 l'
                    },
                    {
                        id: 29,
                        name: 'Sauvignon',
                        price: 20.5,
                        imageFilename: 'wine2.JPG',
                        description: 'Sauvignon â€˜Matusinâ€™ Walter Nardin, Veneto 0,75 l'
                    },
                    {
                        id: 30,
                        name: 'Grauburgunder Weingut',
                        price: 22.7,
                        imageFilename: 'wine3.jpg',
                        description: 'Grauburgunder Weingut Braun, Pfalz 0,75 l'
                    },
                    {
                        id: 31,
                        name: 'Lugana Villa',
                        price: 22.7,
                        imageFilename: 'wine4.jpg',
                        description: 'Lugana Villa Trendi, Gardasee 0,75 l'
                    }
                ]
            }
        },
        order: {
            orderItems: [],
            selectedProducts: [],
            orderState: 'OPEN',
            paymentType: 'CASH',
            deliveryType: 'PICKUP'
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



