import {Actions, createFetchOrdersFailAction, createFetchOrdersSuccessAction} from '../adminActions';
import {api} from "../../../api/api";

import * as sagaEffects from 'redux-saga/effects'
import {Authorization} from "../../../AppState";

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;

export function* getOrdersWatcher() {
	yield takeLatest(Actions.FETCH_ORDERS, getOrders);
}


function* getOrders(action: { Authorization: Authorization; }) {

	try {

		console.info("action.Authorization.token " + action.Authorization.token);

		if (!action.Authorization.token)
			yield put(createFetchOrdersFailAction("No authorisation token supplied"));

		// @ts-ignore
		const response = yield call(api.fetchOrders, action.Authorization);

		if (response.status === 200) {
			console.info("response.data " + response.data);

			yield put(createFetchOrdersSuccessAction(response.data));
			console.info("success : " + response.data)
		} else if (response.status === 403) {
			console.error(JSON.stringify(response))
			yield put(createFetchOrdersFailAction("403 Access Forbidden"));
		} else if (response.status === 500) {
			console.error(JSON.stringify(response))
			yield put(createFetchOrdersFailAction("500 Internal Server Error "));
		} else {
			console.error(JSON.stringify(response))
			yield put(createFetchOrdersFailAction("Unknown Error Y "+ JSON.stringify(response)));
		}
	} catch (e) {

		console.error('Error fetching orders!!', e);
		// @ts-ignore
		yield put(createFetchOrdersFailAction("Unknown Error X " + e.message));
	}
}
