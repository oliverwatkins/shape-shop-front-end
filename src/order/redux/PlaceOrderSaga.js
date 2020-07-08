import { put, call, takeLatest } from 'redux-saga/effects';

import {
	Actions,
	createFetchProductsSuccessAction,
	createPlaceOrderErrorAction,
	createPlaceOrderSuccessAction
} from './productActions';
import {delay} from "@redux-saga/core/effects";
import {createFetchOrdersFailAction} from "../../admin/redux/adminActions";

export default api => {
	function* placeOrderWatcher() {
		yield takeLatest(Actions.PLACE_ORDER, placeOrder);
	}

	function* placeOrder(orderData) {
		try {
			// alert("1")
			console.info("orderData: " + JSON.stringify(orderData))

			if (orderData.value.selectedDrinks)
				orderData.value.selectedProducts.concat(orderData.value.selectedDrinks)

			let nOrderData = {
				...orderData.value.address,
				deliveryType:orderData.value.deliveryType,
				paymentType:orderData.value.paymentType,
				selectedProducts:orderData.value.selectedProducts,
			}

			console.info("orderData 2: " + JSON.stringify(nOrderData))


			const response = yield call(api.placeOrder, nOrderData);

			// alert("xxorderData: " + JSON.stringify(orderData))

			console.info("orderData: " + JSON.stringify(orderData))

			if (response.status === 200) {
				yield delay(1000);
				yield put(createPlaceOrderSuccessAction(response.data));
			} else if (response.status === 403) {
				yield put(createPlaceOrderErrorAction(response.data, "403 Access Forbidden "));
			} else if (response.status === 500) {
				yield put(createPlaceOrderErrorAction(response.data, "500 Internal Server Error "));
			} else {
				alert("unknown error : " + response)
			}
		} catch (e) {
			yield put(createPlaceOrderErrorAction({}, "Unkown Error "));
			console.error('Error fetching shops!!');

			console.error(e);
		}
	}

	return {
		placeOrderWatcher,
	};
};
