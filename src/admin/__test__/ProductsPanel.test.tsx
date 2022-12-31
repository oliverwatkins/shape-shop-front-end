import React from 'react';

import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {combineReducers, createStore} from "redux";
import {productsReducer as products} from "../../admin/redux/productsReducer";
import {reducer as loginReducer} from "../../login/redux/loginReducer";

import {reducer as order} from "../../admin/redux/orderReducer";
import {reducer as admin} from "../../admin/redux/adminReducer";
import {getMockData} from "../../order/test/mockData";
import { Provider } from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import ProductsPanel from "../products/ProductsPanel";
import AddressStep from "../../order/steps/AddressStep";
import {api} from "../../api/api";
import {useAsync} from "react-async-hook";
import fetchProducts2 from "../products/api2";
// import {fetchProducts2} from "../products/api2";

// const initialState = {
// 	loggingIn: false,
// };

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
					token: "" +
						"",
					role: "",
					username: "asdf"
				},
				loggingIn: false
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
				]
			}
		}
	);
}


// export type LoginState = {
// 	loginToken?: Authorization,
// 	loggingIn: boolean,
// }
//
// export type Authorization = {
// 	username: string,
// 	token: string,
// 	role?: string
// };

// jest.mock("react-async-hook/useAsync", () => ({
// 	result: ["test"]
// }));

// jest.spyOn(api, 'fetchProducts').mockReturnValue({ someObjectProperty: 42 });
// moduleApi.functionToMock = jest.fn().mockReturnValue({ someObjectProperty: 42 });

// jest.mock("../../api/api", () => {
//
// 	const originalModule = jest.requireActual('../../api/api');
//
// 	const prods = [{"blah" : 1} ];
// 	return {
// 		...originalModule,
// 		fetchProducts: jest.fn(() =>
// 		{
// 			console.info("in jest mock")
// 			return Promise.resolve(prods)
// 		})
// 	};
// });
jest.mock("../products/api2");
jest.setTimeout(100000)

// jest.mock('./../products/api2', () => {
// 	const originalModule = jest.requireActual('./../products/api2');
//
// 	//Mock the default export and named export 'foo'
// 	return {
// 		// __esModule: true,
// 		...originalModule,
// 		default: jest.fn(() => {
// 			return ['mocked baz']
// 		}),
// 		fetchProducts2: jest.fn(() => {
// 			return ['mocked baz']
// 		}),
// 	};
// });
// fetchProducts2
let xx=	[
	{
		"id": 1,
		"name": "asdfasdf",
		"price": 10.9,
		"description": "vvv",
		"imageFilename": "lachs_spinat.jpg",
		"categories": [
			{
				"id": 0,
				"name": "main"
			}
		]
	},
		{
			"id": 2,
			"name": "zxcvzxcv",
			"price": 4.5,
			"description": "vvv",
			"imageFilename": "calamari.jpg",
			"categories": [
				{
					"id": 1,
					"name": "drinks"
				}
			]
		}
		]


describe('Products test', () => {

	// api2.fe
	// fetchProducts2()

	// fetchProducts2.mockImplementation(async () => ["asdf"])

	// fetchProducts2.mockResolvedValueOnce(testArray);

	//
	it("renders cards correctly", async () => {
		const testArray = ["hi there"];
// @ts-ignore
		fetchProducts2.mockImplementation(async () => {
			console.info("in here")
			return xx;
		})
		// @ts-ignore
		// fetchProducts2.mockResolvedValueOnce(testArray);
		const {container} = render(<Provider store={createTestStore()}>
			<MemoryRouter>
				<ProductsPanel/>
			</MemoryRouter>
		</Provider>);

		await screen.findAllByRole('heading')
		screen.debug();


		const boxes = container.getElementsByClassName('MuiCardHeader-root');
		expect(boxes.length).toBe(1)

		// expect(screen.getByRole('heading')).toHaveTextContent('No Products')
		//
		// expect(screen).toHaveTextContent('lachs')


		// const testArray = ["hi there"];
		// getTest.mockResolvedValueOnce(testArray);
		//
		// render(<TestPanel />);
		//
		// expect(getTest).toHaveBeenCalledTimes(1);
		// expect(getTest).toHaveBeenCalledWith();
		//
		// await waitFor(() => expect(screen.getByText("hi there")).toBeInTheDocument());
	});
	// useAsync()
	// api()

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

		// screen.debug();
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
