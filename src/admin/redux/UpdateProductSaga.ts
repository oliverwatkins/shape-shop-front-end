import {api} from "../../api/api";
import {
	Actions,
	createUpdateProductFailAction,
	createUpdateProductSuccessAction
} from "../../order/redux/productActions";
import {delay} from "@redux-saga/core/effects";

import * as sagaEffects from 'redux-saga/effects'

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;
export function* updateProductWatcher() {
	yield takeLatest(Actions.UPDATE_PRODUCT, updateProduct);
}

function* updateProduct(action: { values: any; Authorization: any; }) {

	try {
		// @ts-ignore
		const response = yield call(api.updateProduct, action.values, action.Authorization);

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
