import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router, MemoryRouter, Route, Switch} from 'react-router-dom';
import {renderToStaticMarkup} from "react-dom/server";

Enzyme.configure({adapter: new Adapter()});

/**
 * Gold standard. If can get this working then it should be possible to test all the routing stuff
 *
 * https://stackoverflow.com/questions/62266127/cannot-navigate-to-path-using-memory-router
 *
 * TODO put some bounty on this question!!
 */

describe('OrderWizard test', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(
				<MemoryRouter initialEntries={["/A"]}>
					<div className={"blah"}>Test
						<Router>
							<Switch>
								<Route path={"/A"}>
									<div className={"asdf"}>A</div>
								</Route>
								<Route path={"/B"}>
									<div>B</div>
								</Route>
							</Switch>
						</Router>
					</div>
				</MemoryRouter>
		);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('matches snapshot', () => {

		expect(wrapper.find(".blah")).toHaveLength(1); //this ok
		expect(wrapper.find(".asdf")).toHaveLength(1); //but this is not ok :( It should find under A

		// expect(renderToStaticMarkup(wrapper)).toMatchSnapshot();
	});
});
