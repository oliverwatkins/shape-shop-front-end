import * as React from 'react';
import { connect } from 'react-redux';
import { createLoginAction } from './loginActions';
import { isUserLoggedIn } from '../selectors';
import { Link } from 'react-router-dom';



export class BasicLoginForm extends React.PureComponent {


	state = {
		username: '',
		password: '',
	};

	handleChange = (e) => {
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
	};

	onSubmit = (e) => {
		e !== undefined && e.preventDefault();
		const { username, password } = this.state;
		this.props.onSubmit(username, password);
	};

	render() {
		if (this.props.isUserLoggedIn)
			return <span>Logged in</span>;

		const { username, password } = this.state;

		return (
				<div className="content__elem content__elem--sidebar sidebar">
					<form className="setup login sidebar__row sidebar__row--content" onSubmit={this.onSubmit}>
						<div className="sidebar__elem sidebar__elem--content sidebar__elem--narrow">
							<div>
								<div>
									<label className="setup__label">{'user name : '}</label>
									<input
										className="setup__input input"
										name={'username'}
										type={'text'}
										value={username}
										onChange={this.handleChange}
										placeholder={'placeholder.email'}
									/>
								</div>
								<div>
									<label className="setup__label">{'password'}</label>
									<input
										className="setup__input input"
										name={'password'}
										type={'password'}
										value={password}
										onChange={this.handleChange}
										placeholder={'password'}
									/>
								</div>
								<div>
									<button
										className="login__button button button--secondary button--sml button--radius"
										type="submit"
									>
										Login
									</button>
								</div>
							</div>
						</div>

					</form>
				</div>
		);
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
