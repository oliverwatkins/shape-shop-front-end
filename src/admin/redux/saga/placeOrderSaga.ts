
import {
	Actions,
	// createFetchProductsSuccessAction,
	createPlaceOrderErrorAction,
	createPlaceOrderSuccessAction
} from '../productActions';
import {delay} from "@redux-saga/core/effects";
import {createFetchOrdersFailAction} from "../adminActions";
import type {Product} from "../../../AppState";
import {api} from "../../../api/api";

import * as sagaEffects from 'redux-saga/effects'

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;

export function* placeOrderWatcher() {
	yield takeLatest(Actions.PLACE_ORDER, placeOrder);
}

function* placeOrder(orderData: any) {
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

		// @ts-ignore
		const response = yield call(api.placeOrder, nOrderData);

		console.info("response: " + JSON.stringify(response))

		if (response.status === 200) {
			yield delay(1000);
			yield put(createPlaceOrderSuccessAction(response.data));
		} else {
			yield put(createPlaceOrderErrorAction(response.data, "Server error  "));
		}
	} catch (e) {
		console.error('Error placing order !!');
		console.error(e);
		yield put(createPlaceOrderErrorAction({}, "Unkown Error.. "));

	}
}
