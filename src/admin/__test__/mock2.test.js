import {act} from "react-dom/test-utils";
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Users from "../src/Users";
import {TestEffect} from "../TestEffect";


/**
 * ?????????????????????????????????
 */

Enzyme.configure({adapter: new Adapter()});

describe("Users", () => {
	let wrapper;
	let users;

	beforeEach(() => {
		const mockResponseData = [{id: 1}, {id: 2}, {id: 3}];
		users = mockResponseData.map(e => ({...e}));
		jest.clearAllMocks();
		global.fetch = jest.fn(async () => ({
			json: async () => mockResponseData
		}));
		wrapper = mount(<TestEffect />);
	});

	it("renders a count of users", async () => {

		await act(() => new Promise(setImmediate)); // <--
		wrapper.update();                           // <--
		const p = wrapper.find("p");
		expect(p.exists()).toBe(true);
		expect(p.text()).toEqual("there are 3 users");
	});
});
