import {Category, Product} from "../../AppState";
import * as constants from "../../constants";

export let api2: any = {}

// TODO are the asyn/awaits here really necessary?


export default async function fetchProducts2(category?: Category){

	// await sleep(100000)

	let data = await fetch(constants.baseURL + constants.company + '/products', {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json()
	}).then(allProducts => {
		let	filteredProducts = allProducts;
		if (category) {
			filteredProducts = allProducts.filter((product: Product)=> {
				if (product.categories) {
					let c = product.categories.find(cat => cat.name === category.name)
					if (c)
						return true;
				}
				return false;
			});
		}
		return {
			status:200,
			data: filteredProducts
		}
	}).catch(error => {
		console.error(error)
		throw error;
	});
	return data.data; //array

};

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


