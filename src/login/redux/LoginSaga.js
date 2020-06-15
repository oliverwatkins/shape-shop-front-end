import {call, put, take} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {createLoginFailAction, createLoginSuccessAction, getAdminDetails, LoginActions} from './loginActions';
import {ADMIN_ROLE} from "../../constants";
import historyObj2 from "../../historyObj2";

export default api => {

	function* loginWatcher() {
		while (true) {
			const { user, password } = yield take(LoginActions.LOGIN);
			yield call(loginWorker, user, password);
		}
	}

	// attempts to login
	function* loginWorker(identifier, password) {
		if (identifier && password) {
			identifier = identifier.trim().toLowerCase();
		}
		const credentials = {
			username: identifier,
			password: password,
		};
		yield call(login, credentials, false);
	}

	function* login(credentials) {
		try {

			const response = yield call(api.loginUser, credentials);

			if (response.ok) {
				if (!response.headers.authorization) {
					yield put(createLoginFailAction());
				}

				const decodedToken = jwtDecode(response.headers.authorization);

				const userCredentials = {
					...credentials,
					token: response.headers.authorization,
					role: decodedToken.role,
					status: decodedToken.status,
				};

				delete userCredentials.password;
				yield put(createLoginSuccessAction(userCredentials)); //this is being caught by the reducer and put into storage!

				if (decodedToken.role === ADMIN_ROLE) {

					// alert("here " + userCredentials.role + " userCredentials.token " + userCredentials.token)

					// yield put(getAdminDetails(userCredentials.token, userCredentials.role));
					yield put(getAdminDetails(userCredentials.token, userCredentials.role));


					// action.history.push('/logout2/');
					// window.location.reload();
				} else {
					yield put(createLoginFailAction());
					throw new Error('Unknown user role type');
				}
			} else {
				yield put(createLoginFailAction());
			}
		} catch (e) {
			throw new Error(e);
		}
	}

	return {
		loginWatcher,
		loginWorker,
		login,
	};
};


function forwardTo(location) {
	historyObj2.push(location);
}



