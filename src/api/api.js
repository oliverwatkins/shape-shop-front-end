import getApiSauceInstance from '../api/getApiSauceInstance';
import * as constants from "../constants";


let baseURL = 'http://localhost:8080/';

export const ShapeShopService = {
	fetchProducts: async () => {
		return await fetch(baseURL + constants.company + '/products', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			return response.json()
		}).then(data => {
				return {
					status:200,
					data: data
				}
			}
		)
	},


	// const fetchOrders = (Authorization) => {
	// 	api.setHeaders({fetchProducts
	// 			Authorization: "Bearer " + Authorization.token
	// 		}
	// 	);
	// 	return api.get('/' + constants.company + '/orders').then(response => response);
	// };

	// http://localhost:8080';

	fetchOrders: async (handleResult: Function, Authorization) => {
		const result = await fetch('http://localhost:8080/' + constants.company + '/orders', {
			method: "GET",
			headers: [
				["Authorization", "Bearer " + Authorization.token]]
		});
		handleResult(result);
	},
	loginUser: async (credentials) => {
		// console.info(" " + JSON.stringify("credentialis " + credentials))
		//
		//
		// const result = await fetch('/' + constants.company + '/orders', {
		// 	method: "GET",
		// 	headers: [
		// 		["authorization", "???"]]
		// });
		// handleResult(result);
		//
		// ////
		//
		// api.setHeaders({
		// 		Authorization: null
		// 	}
		// );
		//
		// return api.post('/authenticate', credentials).then(response => {
		// 	return response;
		// });
	}


};

/**
 * TODO convert all the API calls to how its done for AdminService
 */

const create = () => {

	let api = getApiSauceInstance();

	const setBaseURL = (baseUrl) => {
		api.setBaseURL(baseUrl);
	};

	const loginUser = (credentials) => {
		console.info(" " + JSON.stringify("credentialis " + credentials))

		api.setHeaders({
				Authorization: null
			}
		);

		return api.post('/authenticate', credentials).then(response => {
			return response;
		});
	};

	const logoutUser = (Authorization) => {

		//TODO
		api.setHeaders({
				Authorization: Authorization}
			);

		return api.post('/logout').then(response => {
			return response;
		});
	};

	const fetchProducts = () => {

		console.info("fetchProducts API " + fetchProducts)

		return api.get('/' + constants.company + '/products').then(response => response);
	};

	const fetchOrders = (Authorization) => {
		api.setHeaders({
				Authorization: "Bearer " + Authorization.token
			}
		);
		return api.get('/' + constants.company + '/orders').then(response => response);
	};

	const placeOrder = (values, Authorization) => {
		api.setHeaders({...Authorization});
		return api.post('/' + constants.company + '/orders', values).then(response => response);
	};

	return {
		setBaseURL,
		fetchProducts,
		loginUser,
		logoutUser,
		placeOrder,
		fetchOrders
	};
};

// let's return back our create method as the default.
export default {
	create,
};
