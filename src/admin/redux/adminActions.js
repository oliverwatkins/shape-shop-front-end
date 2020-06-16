
export function createFetchOrdersAction() {
	return {
		type: Actions.FETCH_ORDERS,
	};
}

export function createFetchOrdersSuccessAction(data) {
	return {
		type: Actions.FETCH_ORDERS_SUCCESS,
		data,
	};
}


export const Actions = {

	FETCH_ORDERS: 'FETCH_ORDERS',
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',

	// UPDATE_PAYMENT_TYPE:'UPDATE_PAYMENT_TYPE',
	// UPDATE_PRODUCT_SELECTION: 'UPDATE_PRODUCT_SELECTION',
	// UPDATE_ADDRESS: 'UPDATE_ADDRESS',
	// UPDATE_DELIVERY_TYPE: 'UPDATE_DELIVERY_TYPE',
	//

};
