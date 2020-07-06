
export function createFetchOrdersAction(auth) {
	return {
		type: Actions.FETCH_ORDERS,
		Authorization: auth,
	};
}

export function createFetchOrdersSuccessAction(data) {
	return {
		type: Actions.FETCH_ORDERS_SUCCESS,
		data,
	};
}
export function createFetchOrdersFailAction(data, msg) {
	return {
		type: Actions.FETCH_ORDERS_FAIL,
		data,
		errorMsg: msg
	};
}



export const Actions = {

	FETCH_ORDERS: 'FETCH_ORDERS',
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',

	// UPDATE_PAYMENT_TYPE:'UPDATE_PAYMENT_TYPE',
	// UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
	// UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	// UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',
	//

};
