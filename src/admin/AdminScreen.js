import * as React from 'react';
import {connect} from "react-redux";
import {selectDrinks, selectMains, selectSelectedDrinks, selectSelectedProducts} from "../selectors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import type {AppState, Product} from "../AppState";
import {createFetchProductsAction} from "../order/redux/productActions";
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
				Admin
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