import {Actions} from './productActions';
import type {OrderState} from "../../AppState";
import {DeliveryType, PaymentType} from "../../constants";

export function reducer(state: OrderState = initialState , action) {
	switch (action.type) {
		case Actions.UPDATE_ADDRESS:
			return {
				...state,
				addressEntity: action.value
			}
		case Actions.UPDATE_CREDIT_CARD:

			let cardType = action.value.paymentMethod.card.brand;


			let m = action.value.paymentMethod.card.exp_month;
			let y = action.value.paymentMethod.card.exp_year;

			let last4 = action.value.paymentMethod.card.last4;

			return {
				...state,
				creditCardEntity: {
					type: cardType,
					expDate: "" + m + y,
					number: "xxxx-xxxxx-xxxxx-" + last4
				}
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
		case Actions.PLACE_ORDER:
			return {
				...state,
				submittingOrder: true,
			}
		case Actions.PLACE_ORDER_SUCCESS:
			return {
				...state,
				submittingOrder: false,
			}
		case Actions.PLACE_ORDER_ERROR:
			return {
				...state,
				submittingOrder: false,
				orderError: action.value,
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
