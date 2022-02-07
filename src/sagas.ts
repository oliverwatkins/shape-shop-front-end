import {fork} from 'redux-saga/effects';
import {loginWatcher} from './login/redux/LoginSaga'
import {logoutWatcher} from './login/redux/LogoutSaga'

import {placeOrderWatcher} from './order/redux/placeOrderSaga'
import {getProductsWatcher} from './order/redux/getProductsSaga'
import {getOrdersWatcher} from './admin/redux/OrdersSaga'
//hack to make sagas work. https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";
import {uploadImageWatcher} from "./admin/redux/uploadImageSaga";
import {updateCreateProductWatcher} from "./admin/redux/updateProductSaga";
import {deleteProductWatcher} from "./admin/redux/deleteProductSaga";


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
	yield fork(deleteProductWatcher);
}
