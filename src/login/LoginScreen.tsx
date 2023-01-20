import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createLoginAction} from './redux/loginActions';
import {isUserLoggedIn} from '../selectors';
import "./login.scss"
import {BasicLoginForm} from "./LoginForm";
import {Redirect} from "react-router";

type Props = {
	isUserLoggedIn?: boolean,
	errorMessage?: string,
}

type State = {
	username?: string,
	password?: string
}

export default function LoginScreen(props: Props) {

	// alert("in login screen")
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(isUserLoggedIn)

	let onSubmit = (data:any) => {
		dispatch(createLoginAction(data.username, data.password));
	}
	console.info("is logged in = " + isLoggedIn)

	if (isLoggedIn) {
		console.info("is logged in ")
		return <Redirect to="/admin/orders/" />
	}

	if (props.errorMessage) {
		alert("this.props.errorMessage " + props.errorMessage)
	}
	return (
		<BasicLoginForm onSubmit={onSubmit}/>
	);
}
