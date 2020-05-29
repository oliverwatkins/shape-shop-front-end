import React from 'react';


class LoginFail extends React.PureComponent {
	render() {
		let msg = this.props.errorMessage;

		return (
			<div className="loginFail">
				Login Fail :(
				<br />
				{msg}
			</div>
		);
	}
}
export default LoginFail;
