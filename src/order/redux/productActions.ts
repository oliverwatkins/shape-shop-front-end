import {Product} from "../../AppState";

export function createFetchProductsAction() {
	return {
		type: Actions.FETCH_PRODUCTS,
	};
}

export function createFetchProductsSuccessAction(data: any) {
	return {
		type: Actions.FETCH_PRODUCTS_SUCCESS,
		data,
	};
}

export function createFetchProductsErrorAction(response: any)  {
	return {
		type: Actions.FETCH_PRODUCTS_ERROR,
		value: response
	};
}

export function createUpdateProductSelection(value: any, id: any) {
	return {
		type: Actions.UPDATE_PRODUCT_SELECTION,
		value: value,
		id: id
	};
}

export function createUpdateCreditCard(value: any) {
	return {
		type: Actions.UPDATE_CREDIT_CARD,
		value: value,
	};
}

export function createUpdateAddress(value: any) {
	return {
		type: Actions.UPDATE_ADDRESS,
		value: value
	};
}

export function createUpdateDeliveryType(value: any) {
	return {
		type: Actions.UPDATE_DELIVERY_TYPE,
		value: value
	};
}

export function createUpdatePaymentType(value: any) {
	return {
		type: Actions.UPDATE_PAYMENT_TYPE,
		value: value
	};
}


export function createPlaceOrderAction(data: any) {
	return {
		type: Actions.PLACE_ORDER,
		value: data
	};
}

export function createPlaceOrderSuccessAction(value: any) {
	return {
		type: Actions.PLACE_ORDER_SUCCESS,
		value: value
	};
}

export function createPlaceOrderErrorAction(response: {}, value: string) {
	return {
		type: Actions.PLACE_ORDER_ERROR,
		value: value
	};
}


export function createUpdateProduct(values: Product, Authorization: any) {
	return {
		type: Actions.CREATE_UPDATE_PRODUCT,
		values: values,
		Authorization: Authorization
	};
}

export function createUpdateProductSuccessAction() {
	return {
		type: Actions.UPDATE_PRODUCT_SUCCESS,
	};
}

export function createUpdateProductFailAction(errorMessage: string) {
	return {
		type: Actions.UPDATE_PRODUCT_FAIL,
		errorMessage: errorMessage
	};
}

export const Actions = {
	PLACE_ORDER: "PLACE_ORDER",
	PLACE_ORDER_SUCCESS: "PLACE_ORDER_SUCCESS",
	PLACE_ORDER_ERROR: "PLACE_ORDER_ERROR",

	UPDATE_PAYMENT_TYPE: 'UPDATE_PAYMENT_TYPE',
	UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
	UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',

	UPDATE_CREDIT_CARD: 'UPDATE_CREDIT_CARD',

	FETCH_PRODUCTS: 'FETCH_PRODUCTS',
	FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
	FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',

	CREATE_UPDATE_PRODUCT: 'CREATE_UPDATE_PRODUCT',
	UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
	UPDATE_PRODUCT_FAIL: 'UPDATE_PRODUCT_FAIL'
};
