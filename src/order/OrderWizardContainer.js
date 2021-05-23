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

function OrderWizardContainer(props: Props) {
	return (
		<div className={"order-wizard"}>
			{props.productsError && <span className={"error"}>{props.productsError}</span>}
			<Router>
				<Switch>
					<Route path={wizardPages.PRODUCT_LIST}>
						<ProductListStep productItems={props.products}
										 selectedProducts={props.selectedProducts}
										 selectedProducts2={props.selectedProducts2}/>
					</Route>
					<Route path={wizardPages.DRINK_LIST}>
						<Product2Step products2={props.products2} selectedProducts={props.selectedProducts}
									  selectedProducts2={props.selectedProducts2}
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
							products={props.products}
							selectedProducts={props.selectedProducts}
							selectedProducts2={props.selectedProducts2}
							address={props.address}
							deliveryType={props.deliveryType}
							paymentType={props.paymentType}
						/>
					</Route>
					<Route path={wizardPages.OK}>
						<OKStep/>
					</Route>
					<Route path={wizardPages.PAYMENT}>
						<PaymentStep
							selectedProducts={props.selectedProducts}
							selectedProducts2={props.selectedProducts2}
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	)
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
)(OrderWizardContainer);