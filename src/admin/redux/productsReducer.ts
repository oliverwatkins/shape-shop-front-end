import {Actions} from './productActions';

import type {Product, ProductsState} from "../../AppState";

/**
 * transform products array into an object with keys that are the category. Each category has an
 * array of products
 * @param productsArray
 */
export function getCats(productsArray: Array<Product>):  { [category: string]: Array<Product> } {

	let catProds: { [category: string]: Array<Product> } = {}
	// catProds["main"] = []
	// catProds["drinks"] = []

	let filtered = productsArray.filter(p => {

		let cats = p.categories;
		for (const cat of cats) {
			if (cat.name === "main") {
				return true;
			}
		}
		return false;
	})

	let filtered3 = productsArray.filter(p => {

		let cats = p.categories;
		for (const cat of cats) {
			if (cat.name === "drinks") {
				return true;
			}
		}
		return false;
		// return true;
	})

	catProds["mainX"] = filtered;
	catProds["drinksX"] = filtered3;

	return catProds;
}

export function productsReducer(state: ProductsState = initialState, action: any) {

	console.info("in product reducer with action " + action.type)

	switch (action.type) {
		case Actions.ADD_PRODUCT:
			let newItems = state.items;
			newItems.push(action.product);
			return {
				...state,
				items: newItems
				// updatingProduct: true
			};
		case Actions.DELETE_PRODUCT:
			return {
				...state,
				items: state.items.filter((elem)=>{
					return elem.id !== action.product.id
				})
			};
		case Actions.UPDATE_PRODUCT:
			const i = state.items.map((elem)=> {
				if (elem.id === action.product.id)
					return action.product;
				return elem;
			});
			return {
				...state,
				items: i
			};
		case Actions.FETCH_PRODUCTS:


			let productsAndCategories = getCats(action.data)

			return {
				...state,
				items: action.data, //all products
				productsAndCategories: productsAndCategories,
				categories: "keys of pAndC"
			};
		case Actions.UPDATE_PRODUCT_SELECTION:
			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === action.id) {
						return {
							...item,
							"quantity" : action.value
						}
					}
					return item;
				}),
			};
		default :
			return state;
	}
}

const initialState: ProductsState = {
	categories: [""],
	items: [],
	productsError: "",
	updatingProduct: false,
};
