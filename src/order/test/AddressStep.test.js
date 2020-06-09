import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {renderToStaticMarkup} from "react-dom/server";
import AddressStep from "../AddressStep";
import {MemoryRouter} from "react-router-dom";


// import { createMemoryHistory } from 'history'

Enzyme.configure({adapter: new Adapter()});

/**
 * Not working for now.
 */


describe('Address Step test', () => {
	let wrapper;
	const mockStore = configureStore();

	const store = mockStore({
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
	});


	beforeEach(() => {
		wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<AddressStep/>
				</MemoryRouter>
			</Provider>
		);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('matches snapshot', () => {
		expect(renderToStaticMarkup(wrapper)).toMatchSnapshot();
	});


});
