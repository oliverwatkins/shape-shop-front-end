import {api} from "../../../api/api";
import {
	Actions, createAddProductAction, createDeleteProductAction, createUpdateProduct,
	createUpdateProductFailAction,
	createUpdateProductSuccessAction
} from "../productActions";
import {delay} from "@redux-saga/core/effects";

import * as sagaEffects from 'redux-saga/effects'
import {Authorization, Product} from "../../../AppState";

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;

export function* deleteProductWatcher() {
	yield takeLatest(Actions.DELETE_PRODUCT_SERVICE, deleteProduct);
}

function* deleteProduct(action: { product: Product; Authorization: Authorization; }) {

	// try {
	// 	// @ts-ignore
	// 	let response = yield call(api.deleteProduct, action.product, action.Authorization);
	//
	// 	//fake some delay
	// 	yield delay(3000)
	//
	// 	if (response.status === 200) {
	// 		alert("deleted product")
	// 		yield put(createDeleteProductAction(action.product));
	// 	} else {
	// 		console.error(JSON.stringify(response))
	// 		alert("TODO")
	// 		// yield put(createDeleteProductFailAction("Unknown Response Error  "+ JSON.stringify(response)));
	// 	}
	// } catch (e) {
	// 	console.error('Error updating products!!', e);
	// 	// @ts-ignore
	// 	yield put(createDeleteProductFailAction("Unknown Error " + e.message));
	// }
}
