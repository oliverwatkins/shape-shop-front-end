// import {api} from "../../../api/api";
// import {
// 	Actions, createAddProductAction, createUpdateProduct,
// 	createUpdateProductFailAction,
// 	createUpdateProductSuccessAction
// } from "../productActions";
// import {delay} from "@redux-saga/core/effects";

import * as sagaEffects from 'redux-saga/effects'
import {Authorization, Product} from "../../../AppState";

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;


export function* updateCreateProductWatcher() {
	// yield takeLatest(Actions.CREATE_UPDATE_PRODUCT, updateCreateProduct);
}

function* updateCreateProduct(action: { values: Product; Authorization: Authorization; }) {
	//
	// try {
	//
	// 	let response;
	//
	// 	if (action.values.id === "-1") { // create
	// 		// @ts-ignore
	// 		response = yield call(api.createProduct, action.values, action.Authorization);
	// 	}else {
	// 		// @ts-ignore
	// 		response = yield call(api.updateProduct, action.values, action.Authorization);
	// 	}
	//
	// 	//fake some delay
	// 	yield delay(3000)
	//
	// 	if (response.status === 200) {
	// 		if (action.values.id === "-1") { // create
	// 			yield put(createAddProductAction(response.data));
	// 		}else{
	// 			// yield put(createUpdateProduct(response));
	// 		}
	// 	} else {
	// 		console.error(JSON.stringify(response))
	// 		yield put(createUpdateProductFailAction("Unknown Response Error  "+ JSON.stringify(response)));
	// 	}
	// } catch (e) {
	// 	console.error('Error updating products!!', e);
	// 	// @ts-ignore
	// 	yield put(createUpdateProductFailAction("Unknown Error " + e.message));
	// }
}
