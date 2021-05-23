import { put, call, takeLatest } from 'redux-saga/effects';

import {Actions, createFetchProductsErrorAction, createFetchProductsSuccessAction} from './productActions';
import {mockProds} from "../../__mock__/mockProducts";
import {ShapeShopService} from "../../api/api";

export default api => {
	function* getProductsWatcher() {
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
		}
	}

	return {
		getProductsWatcher,
	};
};
