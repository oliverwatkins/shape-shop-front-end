import {Authorization, Product} from "../../AppState";

export function createFetchProductsSuccessAction(data: any) {
	return {
		type: Actions.FETCH_PRODUCTS,
		data,
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

export function createUpdateProductSuccessAction(product: Product) {
	return {
		product: product,
		type: Actions.UPDATE_PRODUCT,
	};
}


export function createDeleteProductAction(product: Product) {
	return {
		type: Actions.DELETE_PRODUCT,
		product: product
	};
}

export function createAddProductAction(product: Product) {
	return {
		type: Actions.ADD_PRODUCT,
		product: product
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

	FETCH_PRODUCTS: 'FETCH_PRODUCTS_SUCCESS',
	ADD_PRODUCT: 'ADD_PRODUCT',
	UPDATE_PRODUCT: 'UPDATE_PRODUCT_SUCCESS',
	DELETE_PRODUCT: 'DELETE_PRODUCT',

};
