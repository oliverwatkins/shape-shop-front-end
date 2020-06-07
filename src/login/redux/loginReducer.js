import {LoginActions} from './loginActions';
import type {LoginState} from "../../AppState";

export function reducer(state: LoginState = initialState, action) {

	console.info("in reducer with action " + action.type)
	switch (action.type) {

		case LoginActions.LOGIN_SUCCESS:

			return {
				...state,
				loginToken: action.token,
				loggingIn: false,
				role: action.role,
				logout: null,
			};
		case LoginActions.LOGIN_FAIL:
			return {
				...state,
				loginToken: null,
				role: false,
				loginError: "logged in bad bad",
				loggingIn: false,
			};
		case LoginActions.LOGOUT:
			return {
				...state,
				logout: 'IN_PROGRESS',
			};
		case LoginActions.LOGOUT_SUCCESS:
			return {
				loginToken: {},
			};
		default :
			return state;
	}
}

const initialState = {
	loggingIn: false,
	loginToken: {},
};
