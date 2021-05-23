import {Actions} from './adminActions';
import type {OrderState} from "../../AppState";
import {toast} from "react-toastify";
import {Notify} from "../../notify";

export function reducer(state: OrderState = initialState , action) {
	switch (action.type) {
		case Actions.FETCH_ORDERS_SUCCESS:

			toast.success("MY SUCCESS");

			return {
				...state,
				orders: action.data,
			};
		case Actions.FETCH_ORDERS_FAIL:
			Notify.error(action.errorMsg)
			return {
				...state,
				orders: [],
				orderError: action.errorMsg,
			};
		default :
			return state;
	}
}

const initialState = {
	orders: [],
};
