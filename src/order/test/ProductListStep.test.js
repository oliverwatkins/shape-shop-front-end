import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {renderToStaticMarkup} from "react-dom/server";
import {MemoryRouter} from "react-router-dom";
import ProductListStep from "../ProductListStep";
import {selectSelectedDrinks, selectSelectedProducts} from "../../selectors";


// import { createMemoryHistory } from 'history'

Enzyme.configure({adapter: new Adapter()});

describe('Payment Step test', () => {
	let wrapper;
	const mockStore = configureStore();

	const data = {
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


	let store = mockStore(data);


	beforeEach(() => {
		wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<ProductListStep
						productItems={data.products}
						selectedDrinks={selectSelectedProducts(data)}
						selectedProducts={selectSelectedDrinks(data)}/>
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
	it('selects radio button', () => {

		let elems = wrapper.find("input[type='radio']");
		expect(elems.length).toBe(2);
		let firstRadio = elems.at(0);
		let secondRadio = elems.at(1);

		checkNoAddressFields(wrapper);

		secondRadio.simulate('change');

		checkAddressFieldsDoExist(wrapper);

		firstRadio.simulate('change');

		checkNoAddressFields(wrapper);
	});

});

let checkNoAddressFields = (wrapper) => {
	let elems = wrapper.find(".paymentPanel");
	expect(elems.length).toBe(0);
}

let checkAddressFieldsDoExist = (wrapper) => {
	let elems = wrapper.find(".paymentPanel");
	expect(elems.length).toBe(1);
}
