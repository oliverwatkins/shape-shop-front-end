import * as React from 'react';
import {connect} from 'react-redux';
import {createLoginAction} from './loginActions';
import {isUserLoggedIn} from '../selectors';
import {Link} from 'react-router-dom';
import "./login.scss"


export class BasicLoginForm extends React.PureComponent {

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
			return <span>Logged in</span>;

		const {username, password} = this.state;

		return <form onSubmit={this.onSubmit} className={"loginForm"}>
			<div className="container">
				<label htmlFor="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="username" value={username} onChange={this.handleChange} required/>

				<label htmlFor="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange} required/>

				<button type="submit">Login</button>
				<label>
					<input type="checkbox" checked="checked" name="remember"/> Remember me
				</label>
			</div>

			<div className="container" style={{backgroundColor: "#f1f1f1"}}>
				<button type="button" className="cancelbtn">Cancel</button>
				<span className="psw">Forgot <a href="#">password?</a></span>
			</div>
		</form>;
	}
}


const mapStateToProps = state => {
	return {
		isUserLoggedIn: isUserLoggedIn(state),
		errorMessage: state.login.errorMessage,
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
