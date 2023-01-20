import * as React from 'react';
import "./login.scss"
import {Redirect} from "react-router";


type Props = {
	name: any;
}

export function LoggedIn(props: Props) {
	return <div>
		<h1>Logged in §! {props.name}</h1>
		<div className="container" style={{backgroundColor: "#f1f1f1"}}>
			<button type="button" className="cancelbtn">Logout</button>
			<Redirect to="/admin/orders/" />
		</div>
	</div>;
}

