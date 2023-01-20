import React from 'react';

import {Link} from "react-router-dom";
import {isUserLoggedIn, selectUserEmail} from "./selectors";
import {useSelector} from "react-redux";


import "./nav.scss"

import welcome from './assets/img/ezgif-5-e18193c8ba03.png';


import {MOCK_MODE} from "./constants";


export default function Nav() {
	{/*//TODO put first cat name in here!!!!*/}
	let firstCat = "beers";

	let isUserLoggedInx = useSelector(isUserLoggedIn);
	let username = useSelector(selectUserEmail);


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

					<Link to={"/order/cat_" + firstCat} >Order</Link>
				</li>
				<li className={"admin"}>
					<Link to="/login">Admin</Link>
				</li>

				<li className={"mock"}>
					{l && <span>MOCK MODE</span>}
				</li>
				<li className={"loggedIn"}>
					<span >
					{isUserLoggedInx && <span>Logged in as {username} </span>}
					</span>
				</li>
				{isUserLoggedInx &&
				<li className={"logout"}>
					<Link to="/logout">
						(Logout)
					</Link>
				</li>
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



