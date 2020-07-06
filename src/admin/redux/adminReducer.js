import {Actions} from './adminActions';
import type {OrderState} from "../../AppState";

export function reducer(state: OrderState = initialState , action) {
	switch (action.type) {
		case Actions.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.data,
			};
		case Actions.FETCH_ORDERS_FAIL:
			return {
				...state,
				orders: [],
				orderError: action.errorMsg,
				// errorMsg
			};
		default :
			return state;
	}
}

const initialState = {
	orders: [],
};
