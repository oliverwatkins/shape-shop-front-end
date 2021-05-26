import { put, call, takeLatest } from 'redux-saga/effects';

import {Actions, createFetchOrdersFailAction, createFetchOrdersSuccessAction} from './adminActions';
import {api} from "../../api/api";
import {toast} from "react-toastify";

export default api => {
	function* getOrdersWatcher() {
		yield takeLatest(Actions.FETCH_ORDERS, getOrders);
	}

	function* getOrders(action) {
		try {

			console.info("action.Authorization.token " + action.Authorization.token);

			if (!action.Authorization.token)
				yield put(createFetchOrdersFailAction("No authorisation token supplied"));

			const response = yield call(api.fetchOrders, action.Authorization);

			if (response.status === 200) {
				yield put(createFetchOrdersSuccessAction(response.data));
				console.info("success : " + response.data)
			} else if (response.status === 403) {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction("403 Access Forbidden"));
			} else if (response.status === 500) {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction("500 Internal Server Error "));
			} else {
				console.error(JSON.stringify(response))
				yield put(createFetchOrdersFailAction("Unknown Error Y "+ JSON.stringify(response)));
			}
		} catch (e) {

			console.error('Error fetching orders!!');
			console.error(e);
			yield put(createFetchOrdersFailAction("", "Unknown Error X " + e.message));
		}
	}
	return {
		getProductsWatcher: getOrdersWatcher,
	};
};
