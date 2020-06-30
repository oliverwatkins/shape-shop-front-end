import { put, call, takeLatest } from 'redux-saga/effects';

import {Actions, createFetchProductsSuccessAction, createPlaceOrderSuccessAction} from './productActions';
import {delay} from "@redux-saga/core/effects";

export default api => {
	function* placeOrderWatcher() {
		yield takeLatest(Actions.PLACE_ORDER, placeOrder);
	}

	function* placeOrder(orderData) {
		try {
			// alert("1")
			const response = yield call(api.placeOrder, orderData);

			alert("orderData: " + JSON.stringify(orderData))

			if (response.status === 200) {

				yield delay(3000);

				yield put(createPlaceOrderSuccessAction(response.data));

			} else {
				alert("error : " + response)
			}
		} catch (e) {
			console.error('Error fetching shops!!');

			console.error(e);
		}
	}

	return {
		placeOrderWatcher,
	};
};
