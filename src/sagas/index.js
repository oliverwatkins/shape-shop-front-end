import {fork} from 'redux-saga/effects';
import login from '../login/LoginSaga'

import productSaga from '../order/redux/ProductSaga'

import api from '../api/api';
import api_mock from '../api/api_mock';
import {MOCK_MODE} from "../constants";



let apiInstance;

if (MOCK_MODE) {
	apiInstance = api_mock.create();
} else {
	apiInstance = api.create();
}


/**
 * Single entry point to start all Sagas
 */
export default function* root() {
	yield fork(login(apiInstance).loginWatcher);
	yield fork(productSaga(apiInstance).getProductsWatcher);
}
