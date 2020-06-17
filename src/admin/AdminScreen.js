import * as React from 'react';
import {connect} from "react-redux";
import type {AppState} from "../AppState";
import {createFetchOrdersAction} from "./redux/adminActions";


type Props = {
	orders: Array<string>,
	fetchOrders: ()=>void
}

export class AdminScreen extends React.PureComponent<Props> {

	componentDidMount() {
		this.props.fetchOrders();
	}


	render() {
		return (
			<div className={"admin"}>
				<h1>Admin Screen</h1>

				{this.props.orders && <div>we have orders</div>}

				{this.props.orders && this.props.orders.map(e => <div> elem </div>) }

				{!this.props.orders && <div>we have no orders</div>}
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