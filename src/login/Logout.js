//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import { createLogoutAction } from './redux/loginActions';
import {OrderWizard} from "../order/OrderWizard";

class Logout extends React.PureComponent<any> {
	componentDidMount(): void {

		this.props.dispatch(createLogoutAction(this.props.token, this.props.history))
		// this.props.logout === null
		// 	? this.props.dispatch(createLogoutAction(this.props.token, this.props.history))
		// 	: this.props.history.push('/sandwich');
	}

	render() {
		alert("in Logout!!")
		return <div><h1>should be empty</h1></div>;
	}
}

type state = {
	login: Object,
	logout: null | string,
};

const mapStateToProps = ({ login }: state) => {
	return {
		token: 'loginToken' in login && login.loginToken.token,
		logout: login.logout,
	};
};

export default connect(mapStateToProps)(Logout);


