

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

export function createLoginFailAction() {
	return {
		type: LoginActions.LOGIN_FAIL,
	};
}

export function createLogoutAction(token, history) {
	return {
		type: LoginActions.LOGOUT,
		token,
		history,
	};
}

export function getCustomerDetails(Authorization, role) {
	return {
		type: LoginActions.RECEIVE_CUSTOMER_DETAILS,
		Authorization,
		role,
	};
}

export function getAdminDetails(Authorization, role) {
	return {
		type: LoginActions.GET_MERCHANT_DETAILS,
		Authorization,
		role,
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
	RECEIVE_CUSTOMER_DETAILS:'RECEIVE_CUSTOMER_DETAILS',
	GET_MERCHANT_DETAILS:'GET_MERCHANT_DETAILS'
};
