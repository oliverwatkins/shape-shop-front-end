import React from 'react';

import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import {getData} from "../../order/test/mockData";
import { Provider } from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import ProductsPanel from "../products/ProductsPanel";
import AddressStep from "../../order/steps/AddressStep";


export function createTestStore() {
	return createStore(
		combineReducers({
			// login: login,
			products: products,
			order: order,
			admin: admin
		}), getData()
	);
}
describe('Products test', () => {

	it('matches snapshot', () => {
		expect(render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>)).toMatchSnapshot();
	});

	it('cc', async () => {
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findAllByRole('heading')

		expect(screen.getByRole('heading')).toHaveTextContent('Category : main')



		expect(screen.getByText('Create Category')).toBeTruthy();
		expect(screen.getByText('Add Product')).toBeTruthy();
		expect(screen.getByText('Edit Category')).toBeTruthy();
		expect(screen.getByText('Delete Category')).toBeTruthy();


		const boxes = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes.length).toBe(2)

		screen.debug();
		// expect(screen.getByRole('button')).toHaveTextContent('Products')

	});

	// const store = createTestStore();
	// it('matches snapshot', () => {
	// 	expect(render(<Provider store={store}>
	// 		<MemoryRouter>
	// 			<AddressStep/>
	// 		</MemoryRouter>
	// 	</Provider>)).toMatchSnapshot();
	// });
	//
	//
	// it('select radio button - check that it works', async () => {
	//




	//
	// 	await screen.findAllByRole('heading')
	//
	// 	expect(screen.getByRole('heading')).toHaveTextContent('Delivery or Pickup?')
	//
	// 	const labelRadio: HTMLInputElement[] = await screen.findAllByRole('radio');
	//
	//
	//
	//
	// 	//TODO not working :
	// 	expect(labelRadio[0].checked).toEqual(true);
	//
	// 	let firstRadio = labelRadio[0];
	// 	let secondRadio = labelRadio[1];
	//
	// 	fireEvent.click(firstRadio);
	//
	// 	let textBoxes: HTMLInputElement[] = await screen.findAllByRole('textbox');
	// 	expect(textBoxes.length).toBe(3);
	//
	// 	fireEvent.click(secondRadio);
	//
	// 	textBoxes = await screen.findAllByRole('textbox');
	// 	expect(textBoxes.length).toBe(5);
	//
	// 	fireEvent.click(firstRadio);
	//
	// 	textBoxes = await screen.findAllByRole('textbox');
	// 	expect(textBoxes.length).toBe(3);
	// });
});
