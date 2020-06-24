import * as React from 'react';
import {connect} from "react-redux";
import type {AppState, OrderState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";
import {Tabs} from "../misc/TabbedPanel";

type Props = {
	orders: Array<OrderState>,
	fetchOrders: ()=>void
}


export class AdminScreen extends React.PureComponent<Props> {

	componentDidMount() {
		this.props.fetchOrders();
	}

	render() {
		return (
			<div className={"admin-screen"}>
				<h1>Admin Screen</h1>


				<Tabs>
					<div label={"Orders"}>
						{this.props.orders && <h4>Current Open Orders</h4>}
						<table className={"orderTable"}>
							<thead>
							<tr>
								<th>
									delivery/pickup
								</th>
								<th>
									cash/card
								</th>
								<th>
									address
								</th>
							</tr>
							</thead>
							<tbody>
							{this.props.orders && this.props.orders.map(order =>
								<OrderPanel order={order}/>
							)}
							</tbody>
						</table>
						{!this.props.orders && <div>we have no orders</div>}
					</div>

					<div label={"Settings"}>

						<h3 style={{padding: "25px"}}>
							Marquee on/off :
						</h3>

						<div style={{padding: "25px"}}>
							<input
								style={{padding: "5px"}}

								type="checkbox"
								/>
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
}

const mapStateToProps = (state: AppState) => {
	return {
		orders: state.admin.orders,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchOrders: () => {
			dispatch(createFetchOrdersAction());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AdminScreen);