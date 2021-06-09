import { put, call, takeLatest } from 'redux-saga/effects';

import {
	Actions, createUpdateProductFailAction, createUpdateProductSuccessAction,
} from './adminActions';
import {api} from "../../api/api";
import {toast} from "react-toastify";

export function* updateProductWatcher() {
	yield takeLatest(Actions.UPDATE_PRODUCT, updateProduct);
}

function* updateProduct(action) {

	try {
		const response = yield call(api.updateProduct, action.values, action.Authorization);

		if (response.status === 200) {
			yield put(createUpdateProductSuccessAction(response.data));
			console.info("success : " + response.data)
		} else {
			console.error(JSON.stringify(response))
			yield put(createUpdateProductFailAction("Unknown Error Y "+ JSON.stringify(response)));
		}
	} catch (e) {
		console.error('Error updating products!!', e);
		yield put(createUpdateProductFailAction("", "Unknown Error X " + e.message));
	}
}
