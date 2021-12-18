/**
 * Mock API for running/testing standalone.
 */
import {mockProds} from "../__mock__/mockProducts";
import {mockOrders} from "../__mock__/mockOrders";
import {ADMIN_TOKEN2} from "../__mock__/testTokens";
import * as constants from "../constants";

// TODO
interface APIinteface {
	// loginUser(string): string;
}

const ADMIN_TOKEN = ADMIN_TOKEN2

export const api_MOCK: APIinteface = {

	loginUser : (credentials: { username: string; password: string; }) => {

		let response;

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

	logoutUser : () => {
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

//
// const create = () => {
//
// 	const ADMIN_TOKEN = ADMIN_TOKEN2
//
// 	const loginUser = credentials => {
//
// 		let response
//
// 		if ((credentials.username == "admin") && (credentials.password == "admin")) {
// 			response = {
// 				ok: true,
// 				status: 200,
// 				data: {
// 					jwt: ADMIN_TOKEN,
// 				},
// 			};
// 		} else {
// 			response = {
// 				ok: false,
// 				status: 500,
// 			};
// 		}
// 		return response;
// 	};
//
//
//
//
// 	const placeOrder = () => {
// 		return {
// 			status: 200,
// 			data: "tododooooo"
// 		};
// 	};
//
// 	const logoutUser = Authorization => {
// 		return {
// 			status: 200
// 		};
// 	};
//
// 	return {
// 		placeOrder,
// 		logoutUser,
// 		loginUser,
// 		fetchProducts,
// 		merchantDetails,
// 		fetchOrders
// 	};
// };
//
// export default {
// 	create,
// };


