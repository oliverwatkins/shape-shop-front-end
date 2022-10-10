import {call, fork, put, take} from 'redux-saga/effects';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import {createLoginFailAction, createLoginSuccessAction, LoginActions} from './loginActions';
import {api} from "../../api/api";


// yield takeLatest(LoginActions.LOGOUT, logoutWorker);








export function* loginWatcher() {

	console.info("starting LOGIN SAGA")

	while (true) {

		console.info(" in while true")

		const { user, password } = yield take(LoginActions.LOGIN);


		// @ts-ignore
		yield call(login, user, password); //hanging here ?

		console.info(" in while true 2.  what is t?")

	}
}

function* login(user: string, password?: string) {

	console.info("in LOGIN SAGA")

	if (user && password) {
		user = user.trim().toLowerCase();
	}
	const credentials = {
		username: user,
		password: password,
	};

	try {
		// @ts-ignore
		const response = yield call(api.loginUser, credentials);

		console.info(JSON.stringify(response));

		if (!response.data.jwt) {
			yield put(createLoginFailAction("No JWT"));
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
		// @ts-ignore
		yield put(createLoginFailAction(e.message));
	}
}
