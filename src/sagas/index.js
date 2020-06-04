import {fork} from 'redux-saga/effects';
import login from '../login/redux/LoginSaga'
import logout from '../login/redux/LogoutSaga'


import productSaga from '../order/redux/ProductSaga'

//hack to make sagas work. https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";

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
	yield fork(logout(apiInstance).logoutWatcher);
	yield fork(productSaga(apiInstance).getProductsWatcher);
}
