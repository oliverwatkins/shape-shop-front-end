import * as React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {createLoginAction} from './redux/loginActions';
import {isUserLoggedIn} from '../selectors';
import "./login.scss"
import {LoggedIn} from "./LoggedIn";
import {AppState} from "../AppState";
import {BasicLoginForm} from "./LoginForm";
import {Redirect} from "react-router";

type Props = {
	isUserLoggedIn?: boolean,
	errorMessage?: string,
	// onSubmit: (data:any)=>void,
}

type State = {
	username?: string,
	password?: string
}

export default function LoginScreen(props: Props) {

	const dispatch = useDispatch();

	const isLoggedIn = useSelector(isUserLoggedIn)

	let onSubmit = (data:any) => {
		dispatch(createLoginAction(data.username, data.password));
	}

	if (isLoggedIn) {

		console.info("about to redirect")
		return <Redirect to="/admin/orders/" />
		// return <LoggedIn name={""}/>;
	}

	if (props.errorMessage) {
		alert("this.props.errorMessage " + props.errorMessage)
	}
	return (
		<BasicLoginForm onSubmit={onSubmit}/>
	);
}
