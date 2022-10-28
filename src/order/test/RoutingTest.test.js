// import React from 'react';
// import Enzyme, {mount} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import {MemoryRouter} from 'react-router-dom';
// import {createMemoryHistory} from "history";
// import App from "../../App";
// import configureStore from "redux-mock-store";
// import {Provider} from "react-redux";
// import {testData1} from "./mockData";
//
// Enzyme.configure({adapter: new Adapter()});
//
// const history = createMemoryHistory();
//
//
// //TODO redundant? this isbeing testede in orderWizard test
// describe('Routing test (next and back buttons)', () => {
// 	let wrapper;
//
// 	const mockStore = configureStore();
//
// 	const store = mockStore(testData1);
//
// 	beforeEach(() => {
// 		wrapper = mount(
// 			<MemoryRouter history={history} initialEntries={['/order/productlist']}>
// 				<Provider store={store}>
// 					<App/>
// 				</Provider>
// 			</MemoryRouter>
// 		);
// 	});
// 	afterEach(() => {
// 		wrapper.unmount();
// 	});
//
// 	it('tests the wizard navigability: clicks through next and back buttons ', () => {
//
// 		expect(wrapper.find(".backButton")).toHaveLength(0);
// 		expect(wrapper.find(".product1-step")).toHaveLength(1); //mains
// 		expect(wrapper.find(".nextButton")).toHaveLength(1);
//
// 		wrapper.find('.nextButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".backButton")).toHaveLength(1);
// 		expect(wrapper.find(".products2-step")).toHaveLength(1);  //drinks
// 		expect(wrapper.find(".nextButton")).toHaveLength(1);
//
// 		wrapper.find('.nextButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".backButton")).toHaveLength(1);
// 		expect(wrapper.find(".address-step")).toHaveLength(1); //address
// 		expect(wrapper.find(".nextButton")).toHaveLength(1);
//
// 		wrapper.find('.nextButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".backButton")).toHaveLength(1);
// 		expect(wrapper.find(".payment-step")).toHaveLength(1); //payment
// 		expect(wrapper.find(".nextButton")).toHaveLength(1);
//
// 		wrapper.find('.nextButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".backButton")).toHaveLength(1);
// 		expect(wrapper.find(".summary-step")).toHaveLength(1); //summary
// 		expect(wrapper.find(".nextButton")).toHaveLength(1);
//
// 		wrapper.find('.backButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".payment-step")).toHaveLength(1); //payment
//
// 		wrapper.find('.backButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".address-step")).toHaveLength(1); //address
//
// 		wrapper.find('.backButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".products2-step")).toHaveLength(1);  //drinks
//
// 		wrapper.find('.backButton').simulate('click', { button: 0 });
//
// 		expect(wrapper.find(".products1-step")).toHaveLength(1); //mains
//
// 	});
// });
