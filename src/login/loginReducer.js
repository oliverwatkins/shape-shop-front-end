import {LoginActions} from './loginActions';

export function reducer(state = initialState, action) {

	console.info("in reducer with action " + action)

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
