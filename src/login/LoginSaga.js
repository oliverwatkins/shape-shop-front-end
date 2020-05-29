import { take, put, call } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {
	LoginActions,
	createLoginSuccessAction,
	createLoginFailAction,
	getCustomerDetails,
	getAdminDetails,
} from './loginActions';
import {ADMIN_ROLE, CUSTOMER_ROLE} from "../constants";

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
			email: identifier,
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

				if (decodedToken.role === CUSTOMER_ROLE) {
					yield put(getCustomerDetails(userCredentials.token, userCredentials.role));
				} else if (decodedToken.role === ADMIN_ROLE) {
					yield put(getAdminDetails(userCredentials.token, userCredentials.role));
				} else {
					yield put(createLoginFailAction());
					throw new Error('Unknown user role type');
				}
			} else {
				// notify('error', 'Username or password wrong', 'Please, try again'); // We should remove it when we have the login design
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



