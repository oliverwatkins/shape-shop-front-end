import {api} from "../../api/api";
import {
	Actions,
	createUpdateProductFailAction,
	createUpdateProductSuccessAction
} from "../../order/redux/productActions";
import {delay} from "@redux-saga/core/effects";

import * as sagaEffects from 'redux-saga/effects'
import {Product} from "../../AppState";

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;


export function* updateCreateProductWatcher() {
	yield takeLatest(Actions.CREATE_UPDATE_PRODUCT, updateCreateProduct);
}

function* updateCreateProduct(action: { values: Product; Authorization: any; }) {

	try {

		let response;

		debugger;
		if (action.values.id === "-1") {

			// @ts-ignore
			response = yield call(api.createProduct, action.values, action.Authorization);

			//add new response obnect to redux stack

			alert("-1 " + JSON.stringify(response))
		}else {
			// @ts-ignore
			response = yield call(api.updateProduct, action.values, action.Authorization);
		}

		//fake some delay
		yield delay(3000)

		if (response.status === 200) {
			yield put(createUpdateProductSuccessAction());
			console.info("success : " + response.data)
		} else {
			console.error(JSON.stringify(response))
			yield put(createUpdateProductFailAction("Unknown Response Error  "+ JSON.stringify(response)));
		}
	} catch (e) {
		console.error('Error updating products!!', e);
		// @ts-ignore
		yield put(createUpdateProductFailAction("Unknown Error " + e.message));
	}
}
