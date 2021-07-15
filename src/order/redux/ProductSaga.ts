import {Actions, createFetchProductsErrorAction, createFetchProductsSuccessAction} from './productActions';
import {mockProds} from "../../__mock__/mockProducts";
import {api} from "../../api/api";
import {Notify} from "../../notify";

import * as sagaEffects from 'redux-saga/effects'

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;


export function* getProductsWatcher() {
	yield takeLatest(Actions.FETCH_PRODUCTS, getProducts);
}

function* getProducts({ Authorization }) {
	try {
		const response = yield call(api.fetchProducts, { Authorization });

		if (response.status === 200) {
			yield put(createFetchProductsSuccessAction(response.data));
			console.info("success : " + response.data)
		} else {
			yield put(createFetchProductsErrorAction(response.data));
		}
	} catch (e) {
		console.error('Error fetching products!!');
		console.error(e);
		Notify.error(e.message)
	}
}
