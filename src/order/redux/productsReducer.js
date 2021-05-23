import {Actions} from './productActions';

import type {ProductsState} from "../../AppState";
import {Notify} from "../../notify";


export function reducer(state:ProductsState = initialState, action) {
	switch (action.type) {

		case Actions.FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				items: action.data,
			};

		case Actions.FETCH_PRODUCTS_ERROR:

			Notify.error(action.errorMsg)

			return {
				...state,
				items: [],
				productsError: "Error Getting Products"
			};

		case Actions.UPDATE_PRODUCT_SELECTION:

			let foundProd = state.items.filter(item => item.id === action.id);

			let fp = foundProd[0];

			fp.quantity = action.value;

			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === action.id) {
						//TODO should spread
						return {"id": item.id,
							"name": item.name,
							"price": item.price,
							"type": item.type,
							"quantity": action.value,
							"imageFilename": item.imageFilename,
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

	// products: {
	// 	items: []
	// }
};
