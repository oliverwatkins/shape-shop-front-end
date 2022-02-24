import {fork} from 'redux-saga/effects';
import {loginWatcher} from './login/redux/LoginSaga'
import {logoutWatcher} from './login/redux/LogoutSaga'

import {placeOrderWatcher} from './admin/redux/saga/placeOrderSaga'
//hack to make sagas work. https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";
import {uploadImageWatcher} from "./admin/redux/saga/uploadImageSaga";


/**
 * Single entry point to start all Sagas
 */
export default function* root() {
	yield fork(loginWatcher);
	yield fork(logoutWatcher);
	yield fork(placeOrderWatcher);
	yield fork(uploadImageWatcher);
}
