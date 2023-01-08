import * as constants from "../constants";
import {api_MOCK} from "./api_mock";
import {Authorization, Category, OrderState, OrderStateType, Product} from "../AppState";
import {setEnvironmentData} from "worker_threads";

export let api: any = {}

// TODO are the asyn/awaits here really necessary?
//
// export async function getTest() {
// 	const response = await fetch("/someservice");
//
// 	return response.data || [];
// }


const apiReal = {



    /**
     * Fetch products for company. If category exists, filter results by category.
     *
     * @param category
     */
    fetchProducts: async (category?: Category)=> {
        // await sleep(100);

        let data = await fetch(constants.baseURL + constants.company + '/products', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // console.info("status : " + response.status)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        }).then(allProducts => {
            let	filteredProducts = allProducts;

            if (filteredProducts.length == 1)
                throw "didnt expect that"

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
            // console.error(error)
            throw error;
        });
        return data.data;
    },


    createProduct: async (values: Product, auth: Authorization)=> {
        // let categories = extractCategories(productData.categoriesForForm, categories);

        // "{\"name\": \"jam scone\", \"price\": \"10\", \"description\": \"asdfasdf\" }";
        if (!auth)
            alert("error: not logged in")

        let data = await fetch(constants.baseURL + constants.company + '/products', {
            method: "POST",
            body:
                JSON.stringify({
                    "name": values.name,
                    "price": values.price,
                    "description": values.description,
                    "categories": values.categories,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + auth.token
            },
        }).then(response => {
            // console.info("status : " + response.status)
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

    updateProduct: async (values: Product, auth: Authorization) => {

        // let categories = extractCategories(productData.categoriesForForm, categories);

        console.info("updateProduct : " + JSON.stringify(values))
        console.info("Authorization : " + JSON.stringify(auth))

        if (!auth)
            alert("error: not logged in")

        let data = await fetch(constants.baseURL + constants.company + '/products/' + values.id, {
            method: "PUT",
            body: JSON.stringify({...values}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + auth.token
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
    },


	deleteProduct: async (values: Product, auth: Authorization)=> {
		let data = await fetch(constants.baseURL + constants.company + '/products/'  + values.id, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "Bearer " + auth.token
			},
		}).then(response => {
			console.info("status : " + response.status)
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// return response.json()
		}).then(data => {
			return {
				status: 200,
				data: data
			}
		}).catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
			return Promise.reject("error")
		});
		return data;
	},




	fetchOrders: async (auth: Authorization, orderState: OrderStateType) => {

		await sleep(1000);

		let data = await fetch(constants.baseURL + constants.company + '/orders', {
			method: "GET",
			headers: [["Authorization", "Bearer " + auth.token]]
		}).then(response => {
			console.info("status : " + response.status)
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json()
		}).then(data => {

			data = data.filter((o: OrderState) => o.orderState === orderState);

			return {
				status:200,
				data: data
			}
		}).catch(error => {
			// console.error('There has been a problem with your fetch operation:', error);
			throw error;
		});
		console.info(" the data returned : " + data)

		return data.data;
	},

	loginUser: (credentials: any) => {
		console.info("credentialis " + JSON.stringify(credentials))

		let data = fetch(constants.baseURL + 'authenticate', {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': ''
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

	// ???
	logoutUser: async (Authorization: any) => {
		//TODO not working yet
		await fetch(constants.baseURL + 'logout', {
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






    placeOrder: async (values: OrderState) => {
        await sleep(2000);

        let data = await fetch(constants.baseURL + constants.company + '/orders', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => {
            console.info("status : " + response.status)
            if (!response.ok) {
                throw new Error('1. Network response was not ok');
            }
            return response.json()
        }).then(data => {
            return {
                status:200,
                data: data
            }
        }).catch(error => {
            console.error('2. There has been a problem with your fetch operation:', error);
            throw error;
        });

        return data;
    },
    uploadImage: async (auth: Authorization, file: any, productId: string) => {

        console.info("file " + JSON.stringify(file));

        const formData = new FormData();
        formData.append('file', file);

        console.info("FormData " + JSON.stringify(formData));

        let data = await fetch(constants.baseURL + constants.company + '/uploadfile/' + productId, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + auth.token
            },
        }).then(response => {
            // console.info("status : " + response.status)
            if (!response.ok) {
                console.error('Network response was not ok. status : ' + response.status);
                throw new Error('Network response was not ok');
            }
            return response
        }).then(data => {
            return {
                status: 200,
                data: data
            }
        }).catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            throw error;
        });
        return data;
    }
};

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * convert "acat" or ["asdf", "asdf"]
 *
 * to [{id:"1", name:"acat"}]
 */
export function extractCategories(product: Product, categories: Array<Category>): Category[] {
    //TODO refactor me
    let cats: Category[] = [];
    if (product.categoriesForForm) {

        if (product.categoriesForForm instanceof Array) {

            let c = categories.filter(elem => product.categoriesForForm?.includes(elem.name))

            cats = c;

        } else if (typeof product.categoriesForForm === 'string') {


            let c = categories.find(e => e.name === product.categoriesForForm)

            //just a string
            if (c)
                cats = [c];
            else
                throw "cannopt find cat"

        } else {
            throw "error..."
        }
    }
    return cats;
}

if (constants.MOCK_MODE) {
	api = api_MOCK;
}else {
	api = apiReal;
}


