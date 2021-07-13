import {Actions} from './adminActions';
import type {OrderState} from "../../AppState";
import {Notify} from "../../notify";
import {PaymentType} from "../../AppState";
// import {PaymentType} from "../../constants";

export function reducer(state: OrderState = initialState,
						action: { type: any; data: any; errorMessage: any; }) {

	//TODO move to orderReducer
	switch (action.type) {
		case Actions.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.data,
			};
		case Actions.FETCH_ORDERS_FAIL:
			Notify.error(action.errorMessage)
			return {
				...state,
				orders: [],
				orderError: action.errorMessage,
			};
		default :
			return state;
	}
}

const initialState = {
	orders: [],
	state: "asdf", //todo convert to enum
	paymentType: PaymentType.card,
	deliveryType: "string",
};
