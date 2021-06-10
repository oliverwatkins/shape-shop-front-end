import {put} from "redux-saga/effects";

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
export function createFetchOrdersFailAction(errorMessage: string) {
	return {
		type: Actions.FETCH_ORDERS_FAIL,
		errorMessage: errorMessage
	};
}

export function createUploadImageSuccessAction() {
	return {
		type: Actions.UPLOAD_IMAGE_FAIL,
	};
}

export function createUploadImageFailAction(errorMessage) {
	return {
		type: Actions.UPLOAD_IMAGE_SUCCESS,
		errorMessage: errorMessage
	};
}



export const Actions = {
	FETCH_ORDERS: 'FETCH_ORDERS',
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',

	UPLOAD_IMAGE: 'UPLOAD_IMAGE',
	UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
	UPLOAD_IMAGE_FAIL: 'UPLOAD_IMAGE_FAIL',


};
