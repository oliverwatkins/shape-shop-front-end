import { put, call, takeLatest } from 'redux-saga/effects';

import { Actions, createFetchOrdersSuccessAction } from './adminActions';

export default api => {
	function* getOrdersWatcher() {
		yield takeLatest(Actions.FETCH_ORDERS, getOrders);
	}

	function* getOrders({ Authorization }) {
		try {
			const response = yield call(api.fetchOrders, { Authorization });

			if (response.status === 200) {
				yield put(createFetchOrdersSuccessAction(response.data));

				console.info("success : " + response.data)
			} else {
				alert("error : " + response)
			}
		} catch (e) {
			console.error('Error fetching shops!!');
			debugger;

			console.error(e);
		}
	}

	return {
		getProductsWatcher: getOrdersWatcher,
	};
};
