import {fork} from 'redux-saga/effects';
import {loginWatcher} from './login/redux/LoginSaga'
import {logoutWatcher} from './login/redux/LogoutSaga'

import {placeOrderWatcher} from './order/redux/PlaceOrderSaga'
import {getProductsWatcher} from './order/redux/ProductSaga'
import {getOrdersWatcher} from './admin/redux/OrdersSaga'
//hack to make sagas work. https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";
import {uploadImageWatcher} from "./admin/redux/ImageUploadSaga";
import {updateCreateProductWatcher} from "./admin/redux/UpdateProductSaga";


/**
 * Single entry point to start all Sagas
 */
export default function* root() {
	yield fork(loginWatcher);
	yield fork(logoutWatcher);
	yield fork(getProductsWatcher);
	yield fork(getOrdersWatcher);
	yield fork(placeOrderWatcher);
	yield fork(uploadImageWatcher);
	yield fork(updateCreateProductWatcher);
}
