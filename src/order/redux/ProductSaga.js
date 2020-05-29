import { put, call, takeLatest } from 'redux-saga/effects';

import { Actions, createFetchProductsSuccessAction } from './productActions';

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
				alert("error : " + response)
				// notifyApiError(response);
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
