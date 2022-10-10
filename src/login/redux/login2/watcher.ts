import { takeLatest } from 'redux-saga/effects';
import {loginSaga} from './authenticationSaga';
import {LoginActions} from "../loginActions";

// import * as types from '../actions';


export default function* loginWatcher2() {
	// yield takeLatest(types.REGISTER_USER, registerSaga);
	yield takeLatest(LoginActions.LOGIN, loginSaga);
}