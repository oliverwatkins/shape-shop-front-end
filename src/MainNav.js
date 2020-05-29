import React from 'react';

import {Link} from "react-router-dom";
import {MOCK_MODE} from "./constants";

export class MainNav extends React.PureComponent {




	render() {

		let l = MOCK_MODE;


		let style = {
			color: "blue",
			float: "right",
			padding: 10

		}
		let style2 = {
			color: "blue",
			float: "right",

		}

		return (
			<nav className={"main-nav"}>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/order/productlist">Order</Link>
					</li>
					<li style={style2}>
						<Link to="/login">Admin</Link>
					</li>

					<li style={style}>
						{l && <span>MOCK MODE</span>}
					</li>

				</ul>
			</nav>
		);
	}
}


