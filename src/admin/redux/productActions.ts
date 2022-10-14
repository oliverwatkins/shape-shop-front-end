import {Authorization, Product} from "../../AppState";
import {createAction} from "@reduxjs/toolkit";

export const Actions = {
	PLACE_ORDER: "PLACE_ORDER",
	PLACE_ORDER_SUCCESS: "PLACE_ORDER_SUCCESS",
	PLACE_ORDER_ERROR: "PLACE_ORDER_ERROR",

	UPDATE_PAYMENT_TYPE: 'UPDATE_PAYMENT_TYPE',

	UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',

	UPDATE_CREDIT_CARD: 'UPDATE_CREDIT_CARD',
};




////////////


export const createUpdateCreditCard_ = createAction<{ value: any } >(Actions.UPDATE_CREDIT_CARD);
export function createUpdateCreditCard(value: any) {
	return {
		type: Actions.UPDATE_CREDIT_CARD,
		value: value,
	};
}

export const createUpdateAddress_ = createAction<{ value: any } >(Actions.UPDATE_ADDRESS);
export function createUpdateAddress(value: any) {
	return {
		type: Actions.UPDATE_ADDRESS,
		value: value
	};
}

export const createUpdateDeliveryType_ = createAction<{ value: any } >(Actions.UPDATE_DELIVERY_TYPE);
export function createUpdateDeliveryType(value: any) {
	return {
		type: Actions.UPDATE_DELIVERY_TYPE,
		value: value
	};
}

export const createUpdatePaymentType_ = createAction<{ value: any } >(Actions.UPDATE_PAYMENT_TYPE);
export function createUpdatePaymentType(value: any) {
	return {
		type: Actions.UPDATE_PAYMENT_TYPE,
		value: value
	};
}

export const createPlaceOrderAction_ = createAction<{ value: any } >(Actions.PLACE_ORDER);
export function createPlaceOrderAction(data: any) {
	return {
		type: Actions.PLACE_ORDER,
		value: data
	};
}
export const createPlaceOrderSuccessAction_ = createAction<{ value: any } >(Actions.PLACE_ORDER_SUCCESS);
export function createPlaceOrderSuccessAction(value: any) {
	return {
		type: Actions.PLACE_ORDER_SUCCESS,
		value: value
	};
}

export const createPlaceOrderErrorAction_ = createAction<{ value: any } >(Actions.PLACE_ORDER_ERROR);
export function createPlaceOrderErrorAction(response: {}, value: string) {
	return {
		type: Actions.PLACE_ORDER_ERROR,
		value: value
	};
}








