//@flow
import * as React from 'react';
import {connect} from 'react-redux';
import {createLogoutAction} from './redux/loginActions';

/**
 * Just empty component. needed?
 */
class Logout extends React.PureComponent<any> {
	componentDidMount(): void {
		this.props.dispatch(createLogoutAction(this.props.token, this.props.history))
	}
	render() {
		return null;
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


