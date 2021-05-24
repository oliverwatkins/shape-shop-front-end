import {fork} from 'redux-saga/effects';
import login from '../login/redux/LoginSaga'
import logout from '../login/redux/LogoutSaga'

import placeOrderSaga from '../order/redux/PlaceOrderSaga'
import productSaga from '../order/redux/ProductSaga'
import ordersSaga from '../admin/redux/OrdersSaga'
//hack to make sagas work. https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";

import {ShapeShopService} from '../api/api';
import {ShapeShopService_MOCK} from '../api/api_mock';
import {MOCK_MODE} from "../constants";


let apiInstance;

if (MOCK_MODE) {
	apiInstance = ShapeShopService_MOCK;
} else {
	apiInstance = ShapeShopService;
}


/**
 * Single entry point to start all Sagas
 */
export default function* root() {
	yield fork(login(apiInstance).loginWatcher);
	yield fork(logout(apiInstance).logoutWatcher);
	yield fork(productSaga(apiInstance).getProductsWatcher);
	yield fork(ordersSaga(apiInstance).getProductsWatcher);
	yield fork(placeOrderSaga(apiInstance).placeOrderWatcher);
}
