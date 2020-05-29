import {Actions} from './productActions';
import type {OrderState} from "../../AppState";

export function reducer(state: OrderState = initialState , action) {
	console.info("xx in reducer with action " + action.type + " data " + action.data)

	switch (action.type) {
		case Actions.UPDATE_ADDRESS:
			return {
				...state,
				address: action.value
			}
		case Actions.UPDATE_PAYMENT:

			alert("in here ")
			return {
				...state,
				payment: action.values
			}

		case Actions.UPDATE_DELIVERY_TYPE:
			return {
				...state,
				deliveryType: action.value
			}
		default :
			return state;
	}
}

const initialState = {
	items: []
};
