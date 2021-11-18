

export function createLoginAction(name, password) {
	return {
		type: LoginActions.LOGIN,
		user: name,
		password: password,
	};
}

export function createLoginSuccessAction(token) {
	return {
		type: LoginActions.LOGIN_SUCCESS,
		token: token,
	};
}

export function createLoginFailAction(eMsg: string) {
	return {
		type: LoginActions.LOGIN_FAIL,
		errorMessage: eMsg
	};
}

export function createLogoutAction(token: string, history) {
	return {
		type: LoginActions.LOGOUT,
		token,
		history,
	};
}

export function createLogoutSuccessAction() {
	return {
		type: LoginActions.LOGOUT_SUCCESS,
	};
}


export const LoginActions = {
	LOGIN: 'LOGIN',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAIL: 'LOGIN_FAIL',
	LOGOUT: 'LOGOUT',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
	USER_DETAILS_RECEIVED: 'USER_DETAILS_RECEIVED',
};