

import { LoginActions, createLogoutSuccessAction } from './loginActions';
import { api } from "../../api/api";


import * as sagaEffects from 'redux-saga/effects'

//bypassing typescript problems by doing this :
const takeLatest: any = sagaEffects.takeLatest;
const call: any = sagaEffects.call;
const put: any = sagaEffects.put;

export function* logoutWatcher() {
	yield takeLatest(LoginActions.LOGOUT, logoutWorker);
}

function* logoutWorker(action: { token: any; history: string[]; }) {
	const Authorization = {
		Authorization: action.token,
	};

	yield call(api.logoutUser, Authorization);
	yield put(createLogoutSuccessAction());

	//redirect
	action.history.push('/logout2/');
	window.location.reload();
}
