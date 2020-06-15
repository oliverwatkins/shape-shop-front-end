import * as React from 'react';
import {connect} from "react-redux";
import {selectDrinks, selectMains, selectSelectedDrinks, selectSelectedProducts} from "../selectors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import type {AppState, Product} from "../AppState";


type Props = {
	products: Array<Product>,
	drinks:Array<Product>,
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
	deliveryType: string,
	paymentType: string,
}

export class AdminScreen extends React.PureComponent<Props> {
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
		// orders: state.admin.orders,
	};
};


export default connect(
	mapStateToProps,
	null,
)(AdminScreen);