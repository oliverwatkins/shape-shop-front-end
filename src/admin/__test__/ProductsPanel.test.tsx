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
import {setupMockFetches} from "./mockFetch";

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
			}
		}
	);
}


// jest.setTimeout(1000000)
describe('Products test', () => {

	beforeAll(() => jest.spyOn(window, 'fetch'))

	it("renders error", async () => {

		// @ts-ignore
		window.fetch.mockResolvedValueOnce({
			ok: false,
			json: async () => ([]),
		})

		// @ts-ignore
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findByText('ERROR product error: Network response was not ok', { collapseWhitespace: true })
	});
	// https://kentcdodds.com/blog/stop-mocking-fetch
	it("renders products correctly", async () => {

		setupMockFetches()

		// @ts-ignore
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findAllByRole('heading')
		// screen.debug(container);

		expect(screen.getByRole('heading')).toHaveTextContent('products of category main')

		expect(screen.getByText('Create Category')).toBeTruthy();
		expect(screen.getByText('Add Product')).toBeTruthy();
		expect(screen.getByText('Edit Category')).toBeTruthy();
		expect(screen.getByText('Delete Category')).toBeTruthy();

		const boxes = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes.length).toBe(1)
		expect(boxes[0]).toHaveTextContent('first');

		let b = screen.getByRole('tab', {
			name: "drinks"
		})
		fireEvent.click(b);


		const boxes2 = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes2.length).toBe(1)
		expect(boxes2[0]).toHaveTextContent('second');
	});

	it('matches snapshot', () => {

		let {container} = render(<Provider store={createTestStore2()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>)

		const postItemNode = screen.findByText('Lachs-Lasagne');

		expect(container).toMatchSnapshot();
	});
});


export function createTestStore2() {
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
