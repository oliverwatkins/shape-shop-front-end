
export function createFetchProductsAction() {
	return {
		type: Actions.FETCH_PRODUCTS,
	};
}

export function createFetchProductsSuccessAction(data) {
	return {
		type: Actions.FETCH_PRODUCTS_SUCCESS,
		data,
	};
}


export function createUpdateProductSelection(value, id) {
	return {
		type: Actions.UPDATE_PRODUCT_SELECTION,
		value: value,
		id: id
	};
}

export function createUpdateAddress(value, id) {
	return {
		type: Actions.UPDATE_ADDRESS,
		value: value,
		id: id
	};
}

export function createUpdateDeliveryType(value) {
	return {
		type: Actions.UPDATE_DELIVERY_TYPE,
		value: value
	};
}

export function createUpdatePaymentType(value) {
	return {
		type: Actions.UPDATE_PAYMENT_TYPE,
		value: value
	};
}


export function createPlaceOrderAction(value) {
	return {
		type: Actions.PLACE_ORDER,
		value: value
	};
}

export function createPlaceOrderSuccessAction(value) {
	return {
		type: Actions.PLACE_ORDER_SUCCESS,
		value: value
	};
}


export const Actions = {
	PLACE_ORDER: "PLACE_ORDER",
	PLACE_ORDER_SUCCESS: "PLACE_ORDER_SUCCESS",
	UPDATE_PAYMENT_TYPE:'UPDATE_PAYMENT_TYPE',
	UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
	UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',
	FETCH_PRODUCTS: 'FETCH_PRODUCTS',
	FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
};
