import * as React from 'react';
import {connect} from 'react-redux';
import {createLoginAction} from './redux/loginActions';
import {isUserLoggedIn} from '../selectors';
import "./login.scss"
import {LoggedIn} from "./LoggedIn";

type Props = {
	isUserLoggedIn: boolean,
	errorMessage: string
}

type State = {
	username: string,
	password: string
}

export class BasicLoginForm extends React.PureComponent<Props, State> {

	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		};
	}

	handleChange = (e) => {
		const {name, value} = e.currentTarget;
		this.setState({[name]: value});
	};

	onSubmit = (e) => {
		e !== undefined && e.preventDefault();
		const {username, password} = this.state;
		this.props.onSubmit(username, password);
	};

	render() {
		if (this.props.isUserLoggedIn)
			return <LoggedIn/>;

		const {username, password} = this.state;

		if (this.props.errorMessage) {
			alert("this.props.errorMessage " + this.props.errorMessage)

		}

		return (
			<div>
				<h1>Login </h1>

				{this.props.loginError &&
				<span className={"error"}>{this.props.loginError}</span>
				}

				<form onSubmit={this.onSubmit} className={"loginForm"}>
					<div className="container">
						<label htmlFor="uname"><b>Username</b></label>
						<input type="text" placeholder="Enter Username" name="username" value={username}
									 onChange={this.handleChange}
									 required/>

						<label htmlFor="psw"><b>Password</b></label>
						<input type="password" placeholder="Enter Password" name="password" value={password}
									 onChange={this.handleChange} required/>

						<button type="submit">Login</button>
						<label>
							<input type="checkbox" checked="checked" name="remember"/> Remember me
						</label>
					</div>

					<div className="container" style={{backgroundColor: "#f1f1f1"}}>
						<button type="button" className="cancelbtn">Cancel</button>
						<span className="psw">Forgot <a href="#">password?</a></span>
					</div>
				</form>
			</div>);
	}
}


const mapStateToProps = state => {
	return {
		isUserLoggedIn: isUserLoggedIn(state),
		errorMessage: state.login.errorMessage,
		loginError: state.login.loginError
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: (name, password) => {
			dispatch(createLoginAction(name, password));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BasicLoginForm);
