import React from 'react';
import {Provider} from 'react-redux';
import AddressStep from "../AddressStep";
import {MemoryRouter} from "react-router-dom";

import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from "redux-mock-store";


//TODO change all other enzyme tests to testing library (like here)
describe('Address Step test', () => {
	const mockStore = configureStore();

	const store = mockStore(getData());

	// it('matches snapshot', () => {
	// 	expect(render(<Provider store={store}>
	// 		<MemoryRouter>
	// 			<AddressStep/>
	// 		</MemoryRouter>
	// 	</Provider>)).toMatchSnapshot();
	// });


	it('select radio button - check that it works', async () => {
		render(<Provider store={store}>
		 			<MemoryRouter>
		 				<AddressStep/>
					</MemoryRouter>
				</Provider>)

		await screen.findAllByRole('heading')

		expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?')

		const labelRadio: HTMLInputElement[] = await screen.findAllByRole('radio');
		expect(labelRadio[0].checked).toEqual(true);

		let firstRadio = labelRadio[0];
		let secondRadio = labelRadio[1];

		fireEvent.click(firstRadio);

		let textBoxes: HTMLInputElement[] = await screen.findAllByRole('textbox');
		expect(textBoxes.length).toBe(3);

		fireEvent.click(secondRadio);

		textBoxes = await screen.findAllByRole('textbox');
		expect(textBoxes.length).toBe(5);

		fireEvent.click(firstRadio);

		textBoxes = await screen.findAllByRole('textbox');
		expect(textBoxes.length).toBe(3);
	});
});

function getData() {
	return {
		products: {
			items: [
				{
					name: "prod1",
					quantity: 1,
					price: 123,
					description: "asfd",
					type: "main",
					imageFilename: "",
				},
				{
					name: "prod2",
					quantity: 2,
					price: 124,
					description: "fasfdasfd",
					type: "drink",
					imageFilename: "",
				},
			]
		},
		order: {
			paymentType: "cash",
			deliveryType: "pickup",
			address: {
				name: "fasdfas",
				telephone: "1234444",
				street: "asdfasdfasdf",
				postcode: "sfdsd23",
				username: "asdfasdf"
			}
		},
		login: {
			loginToken: "should something be here?",
			role: "asfd",
			loggingIn: false,
		},
		user: Function, //??
	};
}


