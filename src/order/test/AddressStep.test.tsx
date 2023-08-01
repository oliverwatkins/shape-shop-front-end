import React from 'react';
import {Provider} from 'react-redux';
import AddressStep from "../steps/AddressStep";
import {MemoryRouter} from "react-router-dom";

import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import {getMockData} from "./mockData";
import {reducer as loginReducer} from "../../login/redux/loginReducer";

// export function createTestStore() {
//
// 	return createStore(
// 		combineReducers({
// 			// @ts-ignore POS ts comnpiler
// 			login: loginReducer,
// 			products: products,
// 			order: order,
// 			admin: admin
// 		}), getMockData()
// 	);
// }
export function createTestStore() {
	return createStore(
		combineReducers({
			// @ts-ignore POS ts comnpiler
			login: loginReducer,
			products: products,
			order: order,
			admin: admin
		}), getMockData()
	);
}
//TODO change all other enzyme tests to testing library (like here)
describe('Address Step test', () => {
	const store = createTestStore();
	it('matches snapshot', () => {
		expect(render(<Provider store={store}>
			<MemoryRouter>
				<AddressStep/>
			</MemoryRouter>
		</Provider>)).toMatchSnapshot();
	});


	it('select radio button - check that it works', async () => {

		render(<Provider store={store}>
		 			<MemoryRouter>
		 				<AddressStep/>
					</MemoryRouter>
				</Provider>)

		await screen.findAllByRole('heading')

		let x = screen.getAllByRole('heading')

		expect(x[0]).toHaveTextContent('Delivery or Pickup?')
		expect(x[1]).toHaveTextContent('Order Summary')

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
