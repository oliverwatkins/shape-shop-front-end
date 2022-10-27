import type {Address, OrderState} from "../../AppState";
import {DeliveryType, OrderStateType, PaymentType} from "../../AppState";
import {AnyAction} from "redux";
import {createAction} from "@reduxjs/toolkit";

const initialState: OrderState = {
	orderItems: [],
	selectedProducts: [],
	orderState: OrderStateType.OPEN,
	paymentType: PaymentType.cash,
	deliveryType: DeliveryType.pickup
};

export const OrderActions = {
	PLACE_ORDER: "PLACE_ORDER",
	PLACE_ORDER_SUCCESS: "PLACE_ORDER_SUCCESS",
	PLACE_ORDER_ERROR: "PLACE_ORDER_ERROR",
	UPDATE_PAYMENT_TYPE: 'UPDATE_PAYMENT_TYPE',
	UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',
	UPDATE_CREDIT_CARD: 'UPDATE_CREDIT_CARD',
};

export const updateCreditCardAction = createAction<{ creditCard: any } >(OrderActions.UPDATE_CREDIT_CARD);
export const updateAddressAction = createAction<{ address: Address } >(OrderActions.UPDATE_ADDRESS);
export const updateDeliveryTypeAction = createAction<{ value: any } >(OrderActions.UPDATE_DELIVERY_TYPE);
export const updatePaymentTypeAction = createAction<{ value: any } >(OrderActions.UPDATE_PAYMENT_TYPE);
export const placeOrderAction = createAction<{ value: any } >(OrderActions.PLACE_ORDER);

export function reducer(state: OrderState = initialState, action: AnyAction): OrderState {
	if (updateAddressAction.match(action)) {
		return {
			...state,
			address: action.payload.address
		}
	}
	if (updateCreditCardAction.match(action)) {
		let cardType = action.payload.creditCard.paymentMethod.card.brand;

		let m = action.payload.creditCard.paymentMethod.card.exp_month;
		let y = action.payload.creditCard.paymentMethod.card.exp_year;

		let last4 = action.payload.creditCard.paymentMethod.card.last4;

		return {
			...state,
			creditCard: {
				name: "??TODO",
				type: cardType,
				expDate: "" + m + y,
				number: "xxxx-xxxxx-xxxxx-" + last4
			}
		}
	}
	if (updatePaymentTypeAction.match(action)) {
		return {
			...state,
			paymentType: action.payload.value
		};
	}
	if (updateDeliveryTypeAction.match(action)) {
		return {
			...state,
			deliveryType: action.payload.value
		}
	}
	if (placeOrderAction.match(action)) {
		return {
			...state,
			submittingOrder: true,
		}
	}
	return state;
}

