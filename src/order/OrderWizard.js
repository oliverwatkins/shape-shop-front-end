import * as React from 'react';
import ProductListStep from "./Product1Step";
import {connect} from "react-redux";
import {
	selectProductType,
	selectSelectedProductType
} from "../selectors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Address from "./AddressStep";
import Summary from "./SummaryStep";
import WhichPayment from "./WhichPaymentStep";
import OKStep from "./OKStep";
import type {AppState, Product} from "../AppState";
import Product2Step from "./Product2Step";
import PaymentStep from "./PaymentStep";

//navigation links
export const wizardPages = {
	PRODUCT_LIST : "/order/productlist",
	DRINK_LIST: "/order/drinklist",
	ADDRESS : "/order/address",
	WHICH_PAYMENT : "/order/whichPayment",
	PAYMENT : "/order/payment",
	SUMMARY : "/order/summary",
	OK: "/order/OK"
}

type Props = {
	products: Array<Product>,
	products2:Array<Product>,
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
	address: Address,
	deliveryType: string,
	paymentType: string,
	productsError: string,
}

export class OrderWizard extends React.PureComponent<Props> {
	render() {

		// if (this.props.productsError)
		// 	alert("this.props.productsError")

		return (
			<div className={"order-wizard"}>
				{this.props.productsError && <span className={"error"}>{this.props.productsError}</span>}
				<Router>
						<Switch>
							<Route path={wizardPages.PRODUCT_LIST}>
								<ProductListStep productItems={this.props.products}
																 selectedProducts={this.props.selectedProducts}
																 selectedProducts2={this.props.selectedProducts2}/>
							</Route>
							<Route path={wizardPages.DRINK_LIST}>
								<Product2Step products2={this.props.products2} selectedProducts={this.props.selectedProducts}
															selectedProducts2={this.props.selectedProducts2}
									/>
							</Route>
							<Route path={wizardPages.ADDRESS}>
								<Address/>
							</Route>
							<Route path={wizardPages.WHICH_PAYMENT}>
								<WhichPayment/>
							</Route>
							<Route path={wizardPages.SUMMARY}>
								<Summary
									products={this.props.products}
								 	selectedProducts={this.props.selectedProducts}
									selectedProducts2={this.props.selectedProducts2}
								 	address={this.props.address}
									deliveryType={this.props.deliveryType}
									paymentType={this.props.paymentType}
								/>
							</Route>
							<Route path={wizardPages.OK}>
								<OKStep/>
							</Route>
							<Route path={wizardPages.PAYMENT}>
								<PaymentStep
									selectedProducts={this.props.selectedProducts}
									selectedProducts2={this.props.selectedProducts2}
								/>
							</Route>
						</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		products: selectProductType(state, "main"),
		products2: selectProductType(state, "drinks"),
		selectedProducts: selectSelectedProductType(state, "main"),
		selectedProducts2: selectSelectedProductType(state, "drinks"),
		productsError: state.products.productsError,
		address: state.order && state.order.address,
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
	};
};


export default connect(
	mapStateToProps,
	null,
)(OrderWizard);