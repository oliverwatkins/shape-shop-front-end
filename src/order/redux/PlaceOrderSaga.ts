import {put, call, takeLatest} from 'redux-saga/effects';

import {
	Actions,
	createFetchProductsSuccessAction,
	createPlaceOrderErrorAction,
	createPlaceOrderSuccessAction
} from './productActions';
import {delay} from "@redux-saga/core/effects";
import {createFetchOrdersFailAction} from "../../admin/redux/adminActions";
import type {Product} from "../../AppState";
import {api} from "../../api/api";

export function* placeOrderWatcher() {
	yield takeLatest(Actions.PLACE_ORDER, placeOrder);
}

function* placeOrder(orderData) {
	try {
		console.info("orderData before : " + JSON.stringify(orderData))
		let prods = [
			...orderData.value.selectedProducts,
			...orderData.value.selectedProducts2,
		]

		if (prods.length == 0)
			throw "prods.length == 0"


		let orderItems = prods.map((prod: Product) => {
			return {
				product: {
					id: prod.id,
					name: prod.name,
				},
				amount: prod.quantity
			};
		})

		let nOrderData = {
			deliveryType: orderData.value.deliveryType,
			paymentType: orderData.value.paymentType,
			orderItems: orderItems,
			addressEntity: orderData.value.addressEntity,
			creditCardEntity: orderData.value.creditCardEntity
		}

		console.info("orderData after : " + JSON.stringify(nOrderData))

		const response = yield call(api.placeOrder, nOrderData);

		console.info("response: " + JSON.stringify(response))

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
