import {call, put, take} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {createLoginFailAction, createLoginSuccessAction, getAdminDetails, LoginActions} from './loginActions';
import {ADMIN_ROLE} from "../../constants";

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

			console.info(JSON.stringify(response));

			if (!response.data.jwt) {
				yield put(createLoginFailAction());
			}

			const decodedToken = jwtDecode(response.data.jwt);

			const userCredentials = {
				...credentials,
				token: response.data.jwt,
				role: decodedToken.scopes,
				// status: decodedToken.status,
			};

			delete userCredentials.password;

			if (decodedToken.scopes === "ROLE_ADMIN") {
				// yield put(getAdminDetails(userCredentials.token, userCredentials.role));
				yield put(createLoginSuccessAction(userCredentials)); //this is being caught by the reducer and put into storage!
			} else {
				yield put(createLoginFailAction());
				throw new Error('Unknown user role type');
			}
		} catch (e) {
			console.error(e)
			yield put(createLoginFailAction(e.message));
		}
	}

	return {
		loginWatcher,
		loginWorker,
		login,
	};
};
