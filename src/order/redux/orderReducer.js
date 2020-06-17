import {Actions} from './productActions';
import type {OrderState} from "../../AppState";
import {DeliveryType, PaymentType} from "../../constants";

export function reducer(state: OrderState = initialState , action) {
	switch (action.type) {
		case Actions.UPDATE_ADDRESS:
			return {
				...state,
				address: action.value
			}
		case Actions.UPDATE_PAYMENT_TYPE:
			return {
				...state,
				paymentType: action.value
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
	items: [],
	paymentType: PaymentType.cash,
	deliveryType: DeliveryType.pickup,
};
