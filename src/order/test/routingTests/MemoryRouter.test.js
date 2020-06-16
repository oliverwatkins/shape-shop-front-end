import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router, Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import {createMemoryHistory} from "history";

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

	beforeEach(() => {
		wrapper = mount(
			<MemoryRouter history={history} initialEntries={['/A']}>
					<div className={"Test"}>This is my Test Component and should not have any test specific code in it
						<Router>
							<Switch>
								<Route path={"/A"}>
									<div className={"A"}>A</div>
									<Link to={"/B"}>
										<button className={"takeMeToB"}>
											Take me to B!!
										</button>
									</Link>
								</Route>
								<Route path={"/B"}>
									<div className={"B"}>B</div>
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

		expect(wrapper.find(".Test")).toHaveLength(1);

		expect(wrapper.find(".A")).toHaveLength(1);
		expect(wrapper.find(".B")).toHaveLength(0);

		wrapper.find('.takeMeToB').simulate('click', { button: 0 });

		expect(wrapper.find(".A")).toHaveLength(0);
		expect(wrapper.find(".B")).toHaveLength(1);
	});
});



