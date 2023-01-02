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

// jest.mock("../products/api2");
// jest.setTimeout(100000)

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


describe('Products test', () => {

	beforeAll(() => jest.spyOn(window, 'fetch'))

	it("renders products correctly", async () => {

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
		screen.debug(container);

		expect(screen.getByRole('heading')).toHaveTextContent('Category : catone')

		expect(screen.getByText('Create Category')).toBeTruthy();
		expect(screen.getByText('Add Product')).toBeTruthy();
		expect(screen.getByText('Edit Category')).toBeTruthy();
		expect(screen.getByText('Delete Category')).toBeTruthy();

		const boxes = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes.length).toBe(1)
		expect(boxes[0]).toHaveTextContent('first');

		let b = screen.getByRole('tab', {
			name: "cattwo"
		})
		fireEvent.click(b);


		const boxes2 = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes2.length).toBe(1)
		expect(boxes2[0]).toHaveTextContent('second');
	});

	it('matches snapshot', () => {
		expect(render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>)).toMatchSnapshot();
	});
});
