import getApiSauceInstance from '../api/getApiSauceInstance';
import * as constants from "../constants";
import {toast} from "react-toastify";
import {mockProds} from "../__mock__/mockProducts";
import {mockOrders} from "../__mock__/mockOrders";
import {ADMIN_TOKEN2} from "../__mock__/testTokens";


let baseURL = 'http://localhost:8080/';
const ADMIN_TOKEN = ADMIN_TOKEN2;

export const ShapeShopService_MOCK = {

	loginUser : credentials => {

		let response

		if ((credentials.username == "admin") && (credentials.password == "admin")) {
			response = {
				ok: true,
				status: 200,
				data: {
					jwt: ADMIN_TOKEN,
				},
			};
		} else {
			response = {
				ok: false,
				status: 500,
			};
		}
		return response;
	},

	placeOrder : () => {
		return {
			status: 200,
			data: "tododooooo"
		};
	},

	logoutUser : Authorization => {
		return {
			status: 200
		};
	},

	fetchProducts: () => {

		console.info("fetchProducts MOCK ")

		return {
			status: 200,
			data: mockProds
		};
	},

	fetchOrders: () => {
		return {
			status: 200,
			data: mockOrders
		};
	}
}


export const ShapeShopService = {
	fetchProducts: async () => {
		let l = await fetch(baseURL + constants.company + '/products', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			console.info("status : " + response.status)
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			if (response.type === "cors") {
				console.info("cors problem?")
				// throw new Error('Fucking cors problem ' + response.url)
			}

			return response.json()
		}).then(data => {
			return {
				status:200,
				data: data
			}
		}).catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});

		return l;
	},
	fetchOrders: async (Authorization) => {
		let l = await fetch(baseURL + constants.company + '/orders', {
			method: "GET",
			headers: [["Authorization", "Bearer " + Authorization.token]]
		}).then(response => {
			console.info("status : " + response.status)
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json()
		}).then(data => {
			return {
				status:200,
				data: data
			}
		}).catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});

		return l;
	},


// 	fetch('flowers.jpg')
// .then(response => {
// 	if (!response.ok) {
// 		throw new Error('Network response was not ok');
// 	}
// 	return response.blob();
// })
// 	.then(myBlob => {
// 		myImage.src = URL.createObjectURL(myBlob);
// 	})
// 	.catch(error => {
// 		console.error('There has been a problem with your fetch operation:', error);
// 	});

	// const fetchOrders = (Authorization) => {
	// 	api.setHeaders({fetchProducts
	// 			Authorization: "Bearer " + Authorization.token
	// 		}
	// 	);
	// 	return api.get('/' + constants.company + '/orders').then(response => response);
	// };

	// http://localhost:8080';


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

	// const fetchOrders = (Authorization) => {
	// 	api.setHeaders({
	// 			Authorization: "Bearer " + Authorization.token
	// 		}
	// 	);
	// 	return api.get('/' + constants.company + '/orders').then(response => response);
	// };

	const placeOrder = (values, Authorization) => {
		api.setHeaders({...Authorization});
		return api.post('/' + constants.company + '/orders', values).then(response => response);
	};

	return {
		setBaseURL,
		fetchProducts,
		loginUser,
		logoutUser,
		placeOrder
		// fetchOrders
	};
};

// let's return back our create method as the default.
export default {
	create,
};
