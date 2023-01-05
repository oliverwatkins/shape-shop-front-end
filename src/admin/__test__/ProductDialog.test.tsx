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

export function createTestStore() {

	return createStore(
		combineReducers({
			// @ts-ignore POS ts comnpiler
			login: loginReducer,
			products: products,
			order: order,
			admin: admin
		}),
		{
			login: {
				loginToken: {
					token: "atoken",
					role: "arole",
					username: "auser"
				},
				loggingIn: false
			},
		}
	);
}

let productlist = [
	{
		"id": 1,
		"name": "first",
		"price": 2.1,
		"description": "my desc",
		"imageFilename": "img.jpg",
		"categories": [
			{
				"id": 0,
				"name": "catone"
			}
		]
	},
	{
		"id": 2,
		"name": "second",
		"price": 3.1,
		"description": "my desc 2",
		"imageFilename": "img2.jpg",
		"categories": [
			{
				"id": 1,
				"name": "cattwo"
			}
		]
	}
]

// jest.setTimeout(1000000)
describe('Products dialog test', () => {

	beforeAll(() => jest.spyOn(window, 'fetch'))

	it("create product", async () => {

		// @ts-ignore
		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => (productlist),
		})

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

		// let addBut = screen.getByText('Create Product!')
		let dia = await screen.findByRole("dialog")
		let cP = screen.getByText('Create Product!')
		expect(cP).toBeTruthy();
		expect(dia).toBeTruthy();


		let cP1 = screen.getByLabelText('name')
		let cP2 = screen.getByLabelText('description')
		let cP3 = screen.getByLabelText('price')
		// let cP4 = screen.getByRole('categories')
		// let cP4 = screen.getByRole('button', {name: 'categories'});
		//TODO do the categories...

		fireEvent.change(cP1, {target: {value: 'myname'}})
		fireEvent.change(cP2, {target: {value: 'desc'}})
		fireEvent.change(cP3, {target: {value: '12'}})
		// fireEvent.change(cP4, {target: {value: 'cat'}})



		// @ts-ignore
		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				"id": 34,
				"company": {
					"id": 1,
					"name": "alpenhof"
				},
				"orders": [],
				"productCategories": [],
				"name": "asdfasdf",
				"description": "sdfg",
				"price": 12,
				"imageFilename": "todo"
			}),
		})

		let cP5 = screen.getByRole('button', {name: 'Submit'});

		fireEvent.click(cP5);

		screen.debug(container);

		//TODO make sure the dialog disapears.
	});

	it("update product", async () => {

		//TODO

	});


	it('matches snapshot', () => {
		expect(render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>)).toMatchSnapshot();
	});
});
