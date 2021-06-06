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





// if (response.status === 200) {
// 	yield put(createUploadImageSuccessAction(response.data));
// 	console.info("success : " + response.data)
// } else {
// 	console.error(JSON.stringify(response))
// 	yield put(createUploadImageFailAction("Unknown Error Y "+ JSON.stringify(response)));
// }
// } catch (e) {
// 	console.error('Error fetching orders!!');
// 	console.error(e);
// 	yield put(createUploadImageFailAction("", "Unknown Error X " + e.message));




export const Actions = {
	FETCH_ORDERS: 'FETCH_ORDERS',
	FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
	FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
	UPLOAD_IMAGE: 'UPLOAD_IMAGE',
	UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
	UPLOAD_IMAGE_FAIL: 'UPLOAD_IMAGE_FAIL'
};
