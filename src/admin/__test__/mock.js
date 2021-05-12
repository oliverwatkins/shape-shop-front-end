/**
 * ?????????????????????????????????
 */

function fetchMock(url, suffix = "") {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({
				json: () =>
					Promise.resolve({
						data: url + suffix,
					}),
			});
		}, 200 + Math.random() * 300)
	);
}


// runs before any tests start running
beforeAll(() => {
	jest.spyOn(global, "fetch").mockImplementation(fetchMock);
});

// runs after all tests have finished
afterAll(() => {
	global.fetch.mockClear();
});
