import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router, MemoryRouter, Route, Switch} from 'react-router-dom';
import { createMemoryHistory } from 'history';
Enzyme.configure({adapter: new Adapter()});

/**
 * Gold standard. If can get this working then it should be possible to test all the routing stuff
 *
 * https://stackoverflow.com/questions/62266127/cannot-navigate-to-path-using-memory-router
 *
 * TODO put some bounty on this question!!
 */

describe('Routing test', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<Router history={createMemoryHistory({ initialEntries: ['/A'] })}>
					<div className={"Test"}>This is my Test Component and should not have any test specific code in it
						<Router>
							<Switch>
								<Route path={"/A"}>
									<div className={"A"}>A</div>
								</Route>
								<Route path={"/B"}>
									<div>B</div>
								</Route>
							</Switch>
						</Router>
					</div>
				</Router>
		);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('matches snapshot', () => {
		expect(wrapper.find(".Test")).toHaveLength(1); //this ok
		expect(wrapper.find(".A")).toHaveLength(1); //but this is not ok :( It should find  A
	});
});


// <MemoryRouter history={createMemoryHistory({ initialEntries: ['/A'] })}>
