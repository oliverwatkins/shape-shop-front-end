import React from 'react';

import {fireEvent, getByText, render, screen, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as loginReducer} from "../../login/redux/loginReducer";

import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import { Provider } from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import ProductsPanel from "../products/ProductsPanel";
import {getMockData} from "../../order/test/mockData";
import {Notify} from "../../notify";
import {setupMockFetches} from "./mockFetch";

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

// jest.setTimeout(1000000)
describe('Products dialog test', () => {

	beforeAll(() => {
		jest.spyOn(window, 'fetch')
		jest.spyOn(Notify, 'success')
		// @ts-ignore

		// Notify.success("banana1")
		// Notify.success("banana2")
	})

	it("create product", async () => {

		// @ts-ignore
		Notify.success.mockImplementation(
			(e: string) => {
				console.info("success called")
			}
		);

		setupMockFetches()

		// @ts-ignore
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findAllByRole('heading')
		// screen.debug(container);

		//add button is there
		let addBut = screen.getByText('Add Product')
		expect(addBut).toBeTruthy();

		fireEvent.click(addBut);

		let dia = await screen.findByRole("dialog")
		let cP = screen.getByText('Create Product!')
		expect(cP).toBeTruthy();
		expect(dia).toBeTruthy();


		let cP1 = screen.getByLabelText('name')
		let cP2 = screen.getByLabelText('description')
		let cP3 = screen.getByLabelText('price')
		//TODO do the categories...

		fireEvent.change(cP1, {target: {value: 'third'}})
		fireEvent.change(cP2, {target: {value: 'desc'}})
		fireEvent.change(cP3, {target: {value: '12'}})
		// fireEvent.change(cP4, {target: {value: 'cat'}})

		let submitButton = screen.getByRole('button', {name: 'Submit'});

		fireEvent.click(submitButton);

		const postItemNode = await screen.findByText('third');

		const boxes = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes.length).toBe(2) //new prod has been added

		screen.debug(boxes[0]);

		//TODO trying to mock Notify.success but not working at the moment
		// expect(Notify.success).toHaveBeenCalledTimes(1);

		//TODO make sure the dialog disapears.
	});

	xit("update product", async () => {


		setupMockFetches()

		// @ts-ignore
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findAllByRole('heading')


		//TODO click on that little three dot thing

	});
});