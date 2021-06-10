import {Actions} from './productActions';

import type {ProductsState} from "../../AppState";
import {Notify} from "../../notify";


export function reducer(state: ProductsState = initialState, action) {
	// console.info("XXreducer(state:ProductsState = initialState, action) " + action.type)

	// debugger;

	switch (action.type) {
		case Actions.UPDATE_PRODUCT:
			return {
				...state,
				updatingProduct: true
			};
		case Actions.UPDATE_PRODUCT_FAIL:
			Notify.error(action.errorMessage)
			return {
				...state,
				updatingProduct: false
			};
		case Actions.UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				updatingProduct: false
			};
		case Actions.FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				items: action.data,
			};
		case Actions.FETCH_PRODUCTS_ERROR:
			Notify.error(action.errorMessage)
			return {
				...state,
				items: [],
				productsError: "Error Getting Products"
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
	items: []
};
