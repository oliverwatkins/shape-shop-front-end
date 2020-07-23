import React from 'react';

import {Link} from "react-router-dom";
import {MOCK_MODE} from "./constants";
import {isUserLoggedIn, selectUserEmail} from "./selectors";
import {connect} from "react-redux";
import "./nav.scss"

import welcome from './assets/img/ezgif-5-e18193c8ba03.png';


type Props = {
	isUserLoggedIn: boolean,
}

class Nav extends React.PureComponent<Props> {

	render() {

		let l = MOCK_MODE;

		return (





			<nav className={"main-nav"}>
				<div className={"upper"}>
					Maxvorstadt, 80333, München, Bayern, Germany
					+491728462474
				</div>


				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/order/productlist">Order</Link>
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

						// <Link className="dd-menu__span" to={'/logout'}>
						// Logout
						// </Link>
					}
				</ul>
				<div>
					<div>
						<img className="asdfasdf" style={{width:"20%"}} src={welcome} alt="  " />
					</div>
					<div className={"lower"}>
					ONLINE SHOP
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		isUserLoggedIn: isUserLoggedIn(state),
		username: selectUserEmail(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {

	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Nav);



