import {call, put, take} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {createLoginFailAction, createLoginSuccessAction, LoginActions} from './loginActions';
import {api} from "../../api/api";


export function* loginWatcher() {
	while (true) {
		const { user, password } = yield take(LoginActions.LOGIN);
		yield call(login, user, password);
	}
}

// function* loginWorker(user, password) {
// 	if (user && password) {
// 		user = user.trim().toLowerCase();
// 	}
// 	const credentials = {
// 		username: user,
// 		password: password,
// 	};
// 	yield call(login, credentials, false);
// }

function* login(user, password) {

	console.info("in LOGIN SAGA")

	if (user && password) {
		user = user.trim().toLowerCase();
	}
	const credentials = {
		username: user,
		password: password,
	};

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
		};

		delete userCredentials.password;

		if (decodedToken.scopes === "ROLE_ADMIN") {
			yield put(createLoginSuccessAction(userCredentials)); //this is being caught by the reducer and put into storage!
		} else {
			yield put(createLoginFailAction('Unknown user role type ' + decodedToken.scopes));
		}
	} catch (e) {
		console.error(e)
		yield put(createLoginFailAction(e.message));
	}
}
