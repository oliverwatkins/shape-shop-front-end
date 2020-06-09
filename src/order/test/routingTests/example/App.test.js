import React from 'react';

import LandingPage from "../../LandingPage";
import NotFoundPage from "../../NotFoundPage";
import {MemoryRouter} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import {renderToStaticMarkup} from "react-dom/server";

Enzyme.configure({adapter: new Adapter()});


jest.mock("react-router-dom/BrowserRouter", () => {
	return ({ children }) => <div>{children}</div>;
});

test('invalid path should redirect to 404', () => {
	const wrapper = mount(
		<MemoryRouter initialEntries={[ '/random' ]}>
			<App/>
		</MemoryRouter>
	);

	let l = renderToStaticMarkup(wrapper);

	expect(renderToStaticMarkup(wrapper)).toMatchSnapshot();

	expect(wrapper.find(LandingPage)).toHaveLength(0);
	expect(wrapper.find(NotFoundPage)).toHaveLength(1);
})
