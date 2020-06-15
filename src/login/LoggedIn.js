import * as React from 'react';
import "./login.scss"
import {Redirect} from "react-router";

export class LoggedIn extends React.PureComponent {
	render() {
		return <div>
			<h1>Logged in §! {this.props.name}</h1>
			<div className="container" style={{backgroundColor: "#f1f1f1"}}>
				<button type="button" className="cancelbtn">Logout</button>


				<Redirect to="/admin/" />
				{/*<span className="psw">*/}
				{/*	<a href="#">logout?</a>*/}
				{/*</span>*/}
			</div>
		</div>;
	}
}

