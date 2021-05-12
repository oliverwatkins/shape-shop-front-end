import { put, call, takeLatest } from 'redux-saga/effects';

import {Actions, createFetchProductsErrorAction, createFetchProductsSuccessAction} from './productActions';
import {mockProds} from "../../__mock__/mockProducts";

export default api => {
	function* getProductsWatcher() {
		yield takeLatest(Actions.FETCH_PRODUCTS, getProducts);
	}

	function* getProducts({ Authorization }) {
		try {

			// TODO temp -
			const fetchProducts = () => {
				return {
					status: 200,
					data: mockProds
				};
			};

			const response = yield call(fetchProducts, { Authorization });

			if (response.status === 200) {
				yield put(createFetchProductsSuccessAction(response.data));

				console.info("success : " + response.data)
			} else {
				yield put(createFetchProductsErrorAction(response.data));
			}
		} catch (e) {
			console.error('Error fetching shops!!');
			debugger;

			console.error(e);
		}
	}

	return {
		getProductsWatcher,
	};
};
