import {Actions} from './productActions';

export function reducer(state = initialState, action) {
	switch (action.type) {

		case Actions.FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				items: action.data,
			};

		// case Actions.UPDATE_ADDRESS:
		// 	return {
		// 		...state,
		// 		address: action.value
		// 	}
		// case Actions.UPDATE_PAYMENT:
		// 	return {
		// 		...state,
		// 		payment: action.values
		// 	}


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
