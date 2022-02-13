import {Actions} from './productActions';

import type {ProductsState} from "../../AppState";
import {Notify} from "../../notify";


export function reducer(state: ProductsState = initialState, action: any) {

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
			return {
				...state,
				items: action.data,
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

const initialState = {
	items: [],
	productsError: "",
	updatingProduct: false,
};
