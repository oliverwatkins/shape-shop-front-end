import * as constants from "../constants";

export const baseURL = 'http://localhost:8080/';
// const ADMIN_TOKEN = ADMIN_TOKEN2;

export const api = {
	fetchProducts: async () => {
		let data = await fetch(baseURL + constants.company + '/products', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
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
			throw error;
			// console.error('There has been a problem with your fetch operation:', error);
		});
		return data;
	},

	fetchOrders: async (Authorization) => {
		let data = await fetch(baseURL + constants.company + '/orders', {
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
			// console.error('There has been a problem with your fetch operation:', error);
			throw error;
		});
		return data;
	},

	loginUser: async (credentials) => {
		console.info("credentialis " + JSON.stringify(credentials))

		let data = await fetch(baseURL + 'authenticate', {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': null
			},
		}).then(response => {
			console.info("status : " + response.status)

			if (response.status === 403)
				throw new Error("Error Logging in. Name or Password are incorrect")

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
			throw error;
		});
		return data;
	},

	logoutUser: async (Authorization) => {
		//TODO not working yet
		await fetch(baseURL + 'logout', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': Authorization
			},
		}).then(response => {
			return response;
		}).catch(error => {
			console.error('Error logging out :', error);
		});
		// return data;
	},

	placeOrder: async (values, Authorization) => {
		let data = await fetch(baseURL + constants.company + '/orders', {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': {...Authorization}
			},
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
			throw error;
		});
		return data;
	},
	uploadImage: async (formData, Authorization) => {


		let data = await fetch(baseURL + constants.company + '/uploadfile', {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': {...Authorization}
			},
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
			throw error;
		});
		return data;

		// axios.post("api/uploadfile", formData);
	},

	updateProduct: async (values, Authorization) => {

		console.info("updateProduct : " + JSON.stringify(values))
		console.info("Authorization : " + JSON.stringify(Authorization))

		let data = await fetch(baseURL + constants.company + '/products/' + values.id, {
			method: "PUT",
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "Bearer " + Authorization.token
			},
		}).then(response => {
			console.info("status : " + response.status)
			if (!response.ok) {
				throw new Error('Network response was not ok status : ' + response.status);
			}
			return response
		}).catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
			throw error;
		});
		return data;

	}
};
