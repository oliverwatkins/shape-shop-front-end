import * as React from 'react';
import {connect} from "react-redux";
import type {AppState, OrderState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";
import {Tabs} from "../misc/TabbedPanel";
import {selectClosedOrders, selectOpenOrders} from "../selectors";
import {useEffect} from "react";
import {TestEffect} from "./TestEffect";

type Props = {
	orders: Array<OrderState>,
	closedOrders: Array<OrderState>,
	fetchOrders: ()=>void,
	dispatch: Function,
	Authorization: string
	// orderError: string
}

function AdminScreen(props: Props) {

	useEffect(() => {
		props.dispatch(createFetchOrdersAction(props.Authorization));
	}, []);

	return (
		<div className={"admin-screen"}>
			<h1>Admin Screen</h1>
			{/*{props.orderError && <span className={"error"}>{props.orderError}</span>}*/}
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
				<div label={"Testing something"}>
					<TestEffect/>
				</div>
			</Tabs>
		</div>
	);
}

const mapStateToProps = (state: AppState) => {
	return {
		orders: selectOpenOrders(state.admin.orders),
		closedOrders: selectClosedOrders(state.admin.orders),
		// orderError: state.admin.orderError,
		Authorization: state.login.loginToken,
	};
};

export default connect(
	mapStateToProps,
	null,
)(AdminScreen);
