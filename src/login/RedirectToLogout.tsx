import * as React from 'react';
import {useDispatch} from 'react-redux';
import {createLogoutAction} from './redux/loginActions';
import {useHistory} from "react-router-dom";

/**
 * Just redirect
 */
export default function RedirectToLogout(props: any) {
	let dispatch = useDispatch();

	let history = useHistory();

	dispatch(createLogoutAction(props.token, history))

	return <div></div>
}


