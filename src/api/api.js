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

	const fetchProducts = () => {
		// api.setHeaders({ ...Authorization });

		return api.get('/products').then(response => response);
	};


	const customerDetails = (Authorization) => {
		api.setHeaders({ ...Authorization });

		return api.get('/customers').then(response => response);
	};

	const logoutUser = (Authorization) => {
		api.setHeaders({ ...Authorization });

		return api.post('/logout').then(response => {
			return response;
		});
	};



	return {
		setBaseURL,
		fetchProducts,
		loginUser,
	};
};

// let's return back our create method as the default.
export default {
	create,
};
