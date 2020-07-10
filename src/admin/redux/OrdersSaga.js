import { put, call, takeLatest } from 'redux-saga/effects';

import {Actions, createFetchOrdersFailAction, createFetchOrdersSuccessAction} from './adminActions';

export default api => {
	function* getOrdersWatcher() {
		yield takeLatest(Actions.FETCH_ORDERS, getOrders);
	}

	function* getOrders(action) {
		try {

			// debugger;
			if (!action.Authorization.token)
				yield put(createFetchOrdersFailAction({}, "No token"));

			const response = yield call(api.fetchOrders, action.Authorization);

			if (response.status === 200) {
				yield put(createFetchOrdersSuccessAction(response.data));
				console.info("success : " + response.data)
			} else if (response.status === 403) {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction(response.data, "403 Access Forbidden"));
			} else if (response.status === 500) {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction(response.data, "500 Internal Server Error "));
			} else {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction(response.data, "Unknown Error "));
			}
		} catch (e) {
			console.error('Error fetching orders!!');
			debugger;

			console.error(e);
		}
	}

	return {
		getProductsWatcher: getOrdersWatcher,
	};
};
