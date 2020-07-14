/**
 * Mock API for running/testing my-wee standalone.
 */
import {mockProds} from "../__mock__/mockProducts";
import {mockOrders} from "../__mock__/mockOrders";

const create = () => {

	const ADMIN_TOKEN =
		'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVSQ0hBTlQiLCJleHAiOjE1NTAyNDc5MjAsInN0YXR1cyI6ImFjdGl2ZSJ9.Y0Qg1meZb2t7fUFLJ9l0WN-smsN1Wrg7bgXVlKLA26O2SM5l_NYGQ6NXy3d16QGAiyFOyV0wKN6DvDjDfUPn5g';

	const loginUser = credentials => {

		let response

		if ((credentials.username == "admin") && (credentials.password == "admin")) {
			response = {
				ok: true,
				status: 200,
				headers: {
					authorization: ADMIN_TOKEN,
				},
			};
		} else {
			response = {
				ok: false,
				status: 500,
			};
		}
		return response;
	};

	const merchantDetails = Authorization => {
		return {
			status: 200,
			data: merchantData,
		};
	};

	const fetchOrders = () => {
		return {
			status: 200,
			data: mockOrders
		};
	};

	const fetchProducts = () => {
		return {
			status: 200,
			data: mockProds
		};
	};

	const placeOrder = () => {
		return {
			status: 200,
			data: "tododooooo"
		};
	};



	const logoutUser = Authorization => {
		return {
			status: 200
		};
	};


	return {
		placeOrder,
		logoutUser,
		loginUser,
		fetchProducts,
		merchantDetails,
		fetchOrders
	};
};

export default {
	create,
};


let merchantData = {
	email: 'asdf@asdf.asdf',
	firstName: 'Mr Mock',
	lastName: 'asdf',
	address: {
		additionalAddress: 'string',
		city: 'Timbuktoo',
		country: 'de',
		postalCode: '23452',
		street: 'company street',
	},
	companyAddress: {
		additionalAddress: 'additional somehwereqwer2',
		city: 'Timbuktoo',
		country: 'de',
		postalCode: '98765',
		street: 'company street',
	},
	cashBackRate: 55,
	companyFirstName: 'company first name',
	companyLastName: 'company last name',
	companyName: 'company name',
	dateOfBirth: '12/12/1988',
	paymentInformation: {
		accountHolder: 'commerzbank company',
		bic: '1236666',
		iban: '1236666COM12333',
		taxId: '91212312341234',
	},
	telephoneNumber: '123442323',
	wantNewsLetter: true,
};