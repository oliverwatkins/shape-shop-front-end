import {Actions} from './adminActions';
import type {OrderState} from "../../AppState";

export function reducer(state: OrderState = initialState , action) {
	switch (action.type) {
		case Actions.FETCH_ORDERS:
			return {
				...state,
				address: action.value
			}
		case Actions.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				paymentType: action.value
			}

		default :
			return state;
	}
}

const initialState = {
	orders: [],
};
