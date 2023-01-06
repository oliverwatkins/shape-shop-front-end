import {LoginActions} from './loginActions';
import type {LoginState} from "../../AppState";
import {Notify} from "../../notify";

export function reducer(state: LoginState = initialState, action: any) {

	console.log("in login reducer with action " + action.type)

	//login action is being caugt in SAGA
	switch (action.type) {
		case LoginActions.LOGIN_SUCCESS:

			console.info("action.token = " + action.token)
			return {
				...state,
				loginToken: action.token,
				loggingIn: false,
				// role: action.role,
				logout: null,
			};
		case LoginActions.LOGIN_FAIL:

			Notify.error(action.errorMessage)

			return {
				...state,
				loginToken: null,
				// role: false,
				// loginError: "Error logging  do we NEEDTHIS?",
				loggingIn: false,
			};
		case LoginActions.LOGOUT:
			return {
				...state,
				logout: 'IN_PROGRESS',
			};
		case LoginActions.LOGOUT_SUCCESS:
			return {
				...state,
				loginToken: {},
			};
		default :
			return state;
	}
}

const initialState = {
	loggingIn: false,
};
