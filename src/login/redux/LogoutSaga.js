//@flow
import { takeLatest, put, call } from 'redux-saga/effects';
import { LoginActions, createLogoutSuccessAction } from './loginActions';

export default (api) => {
	function* logoutWatcher() {
		yield takeLatest(LoginActions.LOGOUT, logoutWorker);
	}

	function* logoutWorker(action) {
		const Authorization = {
			Authorization: action.token,
		};

		yield call(api.logoutUser, Authorization);
		yield put(createLogoutSuccessAction());



		//redirect
		action.history.push('/logout2/');
		window.location.reload();


	}

	return { logoutWatcher };
};
