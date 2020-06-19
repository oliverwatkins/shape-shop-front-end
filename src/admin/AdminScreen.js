import * as React from 'react';
import {connect} from "react-redux";
import type {AppState, OrderState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";

import "./admin.scss"
import OrderPanel from "./OrderPanel";

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
				{this.props.orders && <h4>Orders</h4>}
				<table className={"orderTable"}>
					<thead>
						<tr>
							<th>
								type
							</th>
							<th>
								asdf
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

				<div>
					settings : marquee on/off
				</div>
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