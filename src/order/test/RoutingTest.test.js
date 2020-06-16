import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router, MemoryRouter, Redirect, Route, Switch} from 'react-router-dom';
import {createMemoryHistory} from "history";
import App from "../../App";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

Enzyme.configure({adapter: new Adapter()});


const history = createMemoryHistory();
// const tree = mount(<Router history={history} />);
//
// history.push('/foo');

/**
 * Gold standard. If can get this working then it should be possible to test all the routing stuff
 *
 * https://stackoverflow.com/questions/62266127/cannot-navigate-to-path-using-memory-router
 *
 * TODO put some bounty on this question!!
 */

describe('Routing test', () => {
	let wrapper;

	const mockStore = configureStore();

	// <Provider store={store}>
	// 	<App/>,
	// </Provider>,
	const store = mockStore({
		products: {
			items: [
				{
					name: "prod1",
					quantity: 1,
					price: 123,
					description: "asfd",
					type: "main",
					imageFilename: "pizza.png",
				},
				{
					name: "prod2",
					quantity: 2,
					price: 124,
					description: "fasfdasfd",
					type: "drink",
					imageFilename: "pizza.png",
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

	// order/productlist
	beforeEach(() => {
		wrapper = mount(
			<MemoryRouter history={history} initialEntries={['/order/productlist']}>
				<Provider store={store}>
					<App/>
				</Provider>
			</MemoryRouter>
		);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('click through next button ', () => {
		expect(wrapper.find(".product-selection")).toHaveLength(1);
		expect(wrapper.find(".nextButton")).toHaveLength(1);

		wrapper.find('.nextButton').simulate('click', { button: 0 });

		expect(wrapper.find(".product-selection")).toHaveLength(1);  //drinks

		wrapper.find('.nextButton').simulate('click', { button: 0 });

		expect(wrapper.find(".product-selection")).toHaveLength(0);
	});
});
