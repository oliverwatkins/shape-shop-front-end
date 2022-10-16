import React from 'react';

import {Link} from "react-router-dom";
import {isUserLoggedIn, selectUserEmail} from "./selectors";
import {connect} from "react-redux";
import "./nav.scss"
import {MOCK_MODE} from "./constants";
import {AppState} from "./AppState";

type Props = {
	isUserLoggedIn?: boolean,
	username?: string
}

class Nav extends React.PureComponent<Props> {

	render() {

		let l = MOCK_MODE;

		return (
			<nav className={"main-nav"}>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						{/*//TODO put first cat name in here*/}
						<Link to="/order/cat_main">Order</Link>
					</li>
					<li className={"admin"}>
						<Link to="/login">Admin</Link>
					</li>

					<li className={"mock"}>
						{l && <span>MOCK MODE</span>}
					</li>
					<li className={"loggedIn"}>
						<span >
						{this.props.isUserLoggedIn && <span>Logged in as {this.props.username} </span>}
						</span>
					</li>
					{this.props.isUserLoggedIn &&
					<li className={"logout"}>
						<Link to="/logout">
							(Logout)
						</Link>
					</li>
					}
				</ul>
			</nav>
		);
	}
}

//TODO mvoe to hooks
const mapStateToProps = (state: AppState) => {
	return {
		isUserLoggedIn: isUserLoggedIn(state),
		username: selectUserEmail(state),
	};
};

export default connect(
	mapStateToProps
)(Nav);



