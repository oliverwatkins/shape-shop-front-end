// @flow

import * as React from 'react';
import {connect, useDispatch} from "react-redux";
import type {AdminState, AppState, OrderState, Product, ProductsState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";
import {Tabs} from "../misc/TabbedPanel";
import {selectClosedOrders, selectOpenOrders, selectProductsByType} from "../selectors";
import {useEffect} from "react";
import ProductPanel from "./ProductPanel";
import {Link, Route, Switch} from "react-router-dom";
import {useParams, useRouteMatch} from "react-router";

type Props = {
	orders?: Array<OrderState>,
	closedOrders?: Array<OrderState>,
	fetchOrders?: ()=>void,
	dispatch?: Function,
	Authorization?: string,
	products1?: Array<Product>,
	products2?: Array<Product>
}

function AdminScreen(props: Props) {

	let dispatch = useDispatch();

	useEffect(() => {

		dispatch(createFetchOrdersAction(props.Authorization));
		}, []);

	return (
		<div className={"admin-screen"}>
			<h1>Admin Screen</h1>
			<ul>
				<li>
					<Link to="/admin/orders">Orders</Link>
				</li>
				<li>
					<Link to="/admin/products">Products</Link>
				</li>
				<li>
					<Link to="/admin/settings">Settings</Link>
				</li>
				<li>
					<Link to="/admin/products/topic">Topic</Link>
				</li>
			</ul>

			<Switch>
				<Route path="/admin/orders">
					<Tabs activeTab={"1"}>
						<div title={"OrdersXX"}>
							{props.orders && <h4>Current Open Orders</h4>}
							<OrderPanel type={"open"} orders={props.orders}/>
							{!props.orders && <div>we have no orders</div>}
						</div>
						<div title={"Closed OrdersXX"}>
							{props.closedOrders && <h4>Closed Orders</h4>}
							<OrderPanel orders={props.closedOrders}/>
							{!props.closedOrders && <div>no closed orders</div>}
						</div>
					</Tabs>
				</Route>
				<Route exact path="/admin/products">

					//TODO changed label to title in div component. need to update the Tabs component.

					<div title={"Products"} >
						<Tabs activeTab={"asfd"}>
							<div title={"Products 1"}>
								<ProductPanel products={props.products1} category={"main"}/>
							</div>

							<div title={"Products 2"}>
								<ProductPanel products={props.products2} category={"drinks"}/>
							</div>
						</Tabs>
					</div>
				</Route>
				<Route path="/admin/products/topic/:topicId">
					This is the chosen topic
					<Topic />
				</Route>


				<Route path="/admin/settings">
						<div title={"Settings"}>
							<h3 style={{padding: "25px"}}>
								Marquee on/off :
							</h3>
							<div style={{padding: "25px"}}>
								<input
									style={{padding: "5px"}}
									type="checkbox" />
								<input style={{margin: "5px", width: "700px"}}
									   id="street"
									   type="text"
									   name="street"
									   value={"-- Wir haben ab 30. Mai 2020 geöffnet, ab 5. Juni 2020 sind Hochzeiten wieder möglich! -- "}
								/>
							</div>
						</div>
				</Route>
				{/*<Route path="/topics">*/}
				{/*	<Topics />*/}
				{/*</Route>*/}
			</Switch>
		</div>
	);
}


function Topics() {
	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	let { path, url } = useRouteMatch();

	return (
		<div>
			<h2>Products</h2>

			<Switch>
				<Route exact path={path}>
					<h3>Please select a product.</h3>
				</Route>
				<Route path={`${path}/:topicId`}>
					<Topic />
				</Route>
			</Switch>
		</div>
	);
}

function Topic() {
	// The <Route> that rendered this component has a
	// path of `/topics/:topicId`. The `:topicId` portion
	// of the URL indicates a placeholder that we can
	// get from `useParams()`.
	let { topicId } = useParams<{ topicId: string }>();
	return (
		<div>
			<h3>{topicId}</h3>
		</div>
	);
}


const mapStateToProps = (state: AppState): AdminState => {
	return {
		products1: selectProductsByType(state, "main"),
		products2: selectProductsByType(state, "drinks"),
		orders: selectOpenOrders(state.admin.orders),
		closedOrders: selectClosedOrders(state.admin.orders),
		Authorization: state.login.loginToken,
	};
};

export default connect(
	mapStateToProps,
	null,
)(AdminScreen);
