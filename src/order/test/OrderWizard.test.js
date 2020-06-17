// import React from 'react';
// import Enzyme, {mount, shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import {BrowserRouter as Router, MemoryRouter, Route, Switch} from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import {Provider} from 'react-redux';
// import OrderWizard, {wizardPages} from "../OrderWizard";
//
//
// // import { createMemoryHistory } from 'history'
//
//
// import renderer from 'react-test-renderer';
// import {renderToStaticMarkup} from "react-dom/server";
// import ProductList from "../ProductListStep";
// import DrinksStep from "../DrinksStep";
// import Address from "../AddressStep";
// import WhichPayment from "../WhichPaymentStep";
// import Summary from "../SummaryStep";
// import OKStep from "../OKStep";
//
// Enzyme.configure({adapter: new Adapter()});
//
// /**
//  * Not working for now.
//  */
//
//
// xdescribe('OrderWizard test', () => {
// 	let wrapper;
// 	const mockStore = configureStore();
//
// 	const store = mockStore({
// 		products: {
// 			items: [
// 				{
// 					name: "prod1",
// 					quantity: 1,
// 					price: 123,
// 					description: "asfd",
// 					type: "main",
// 					imageFilename: "",
// 				},
// 				{
// 					name: "prod2",
// 					quantity: 2,
// 					price: 124,
// 					description: "fasfdasfd",
// 					type: "drink",
// 					imageFilename: "",
// 				},
// 			]
// 		},
// 		order: {
// 			paymentType: "cash",
// 			deliveryType: "pickup",
// 			address: {
// 				name: "fasdfas",
// 				telephone: "1234444",
// 				street: "asdfasdfasdf",
// 				postcode: "sfdsd23",
// 				username: "asdfasdf"
// 			}
// 		},
// 		login: {
// 			loginToken: "should something be here?",
// 			role: "asfd",
// 			loggingIn: false,
// 		},
// 		user: Function, //??
// 	});
//
// 	// <MemoryRouter initialEntries={[ '/random' ]}>
// 	// 	<App/>
// 	// </MemoryRouter>
// 	// https://stackoverflow.com/questions/62266127/cannot-navigate-to-path-using-memory-router/62268032#62268032
//
// 	beforeEach(() => {
// 		wrapper = mount(
// 			<Provider store={store}>
// 				<MemoryRouter initialEntries={["/A"]}>
// 					<div>
// 						<Router>
// 							<Switch>
// 								<Route path={"/A"}>
// 									<div>A</div>
// 								</Route>
// 								<Route path={"/B"}>
// 									<div>B</div>
// 								</Route>
// 							</Switch>
// 						</Router>
// 					</div>
// 				</MemoryRouter>
// 			</Provider>
// 		);
// 	});
// 	afterEach(() => {
// 		wrapper.unmount();
// 	});
//
// 	it('matches snapshot', () => {
// 		expect(renderToStaticMarkup(wrapper)).toMatchSnapshot();
// 	});
// });
