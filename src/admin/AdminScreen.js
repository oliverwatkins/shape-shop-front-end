// @flow

import * as React from 'react';
import {connect} from "react-redux";
import type {AdminState, AppState, OrderState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";
import {Tabs} from "../misc/TabbedPanel";
import {selectClosedOrders, selectOpenOrders, selectAllProducts, selectProductsByType} from "../selectors";
import {useEffect} from "react";
import {createFetchProductsAction} from "../order/redux/productActions";
import ProductPanel from "./ProductPanel";

type Props = {
	orders: Array<OrderState>,
	closedOrders: Array<OrderState>,
	fetchOrders: ()=>void,
	dispatch: Function,
	Authorization: string
}

function AdminScreen(props: Props) {

	useEffect(() => {
		props.dispatch(createFetchOrdersAction(props.Authorization));
	}, []);

	// useEffect(() => {
	// 	props.dispatch(createFetchProductsAction());
	// }, []);

	return (
		<div className={"admin-screen"}>
			<h1>Admin Screen</h1>
			<Tabs>
				<div label={"Orders"}>
					{props.orders && <h4>Current Open Orders</h4>}
					<OrderPanel type={"open"} orders={props.orders}/>
					{!props.orders && <div>we have no orders</div>}
				</div>
				<div label={"Closed Orders"}>
					{props.closedOrders && <h4>Closed Orders</h4>}
					<OrderPanel orders={props.closedOrders}/>
					{!props.closedOrders && <div>no closed orders</div>}
				</div>

				<div label={"Products"}>
					<Tabs>
						<div label={"Products 1"}>
							<ProductPanel products={props.products1} category={"main"}/>
						</div>

						<div label={"Products 2"}>
							<ProductPanel products={props.products2} category={"drinks"}/>
						</div>
					</Tabs>
				</div>
				<div label={"Settings"}>
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
			</Tabs>
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
