import getApiSauceInstance from '../api/getApiSauceInstance';

const create = () => {

	let api = getApiSauceInstance();

	const setBaseURL = (baseUrl) => {
		api.setBaseURL(baseUrl);
	};

	const loginUser = (credentials) => {
		return api.post('/login', credentials).then(response => {
			return response;
		});
	};

	const logoutUser = (Authorization) => {
		api.setHeaders({ ...Authorization });

		return api.post('/logout').then(response => {
			return response;
		});
	};

	const fetchProducts = () => {
		return api.get('/products').then(response => response);
	};

	const placeOrder = (values, Authorization) => {

		api.setHeaders({ ...Authorization });

		return api.post('/order', values).then(response => response);
	};

	// const updatePassword: UpdatePassword = (values, Authorization) => {
	// 	api.setHeaders({ Authorization });
	//
	// 	return api.post('/changePassword', values).then(response => response);
	// };


	return {
		setBaseURL,
		fetchProducts,
		loginUser,
		logoutUser,
		placeOrder
	};
};

// let's return back our create method as the default.
export default {
	create,
};
