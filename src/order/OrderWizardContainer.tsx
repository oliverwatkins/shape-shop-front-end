import * as React from 'react';
import {connect} from "react-redux";
import {selectCategories, selectSelectedProductByType} from "../selectors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Summary from "./SummaryStep";
import WhichPayment from "./WhichPaymentStep";
import OKStep from "./OKStep";
import type {Address, AppState, Category, Product} from "../AppState";
import PaymentStep from "./PaymentStep";
import AddressStep from "./AddressStep";
import ProductStep from "./ProductStep";

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
	categoryProducts: { [category: string]: Array<Product> },
	categories: Array<Category>,
	selectedProducts?: Array<Product>,
	address?: Address,
	deliveryType?: string,
	paymentType?: string,
	productsError?: string,
}

function OrderWizardContainer(props: Props) {
	return (
		<div className={"order-wizard"}>
			{props.productsError && <span className={"error"}>{props.productsError}</span>}
			<Router>
				<Switch>
					{createCategoryPages(props)}
					<Route path={wizardPages.ADDRESS}>
						<AddressStep/>
					</Route>
					<Route path={wizardPages.WHICH_PAYMENT}>
						<WhichPayment/>
					</Route>
					<Route path={wizardPages.SUMMARY}>
						<Summary
							selectedProducts={props.selectedProducts}
							address={props.address}
							deliveryType={props.deliveryType}
							paymentType={props.paymentType}
						/>
					</Route>
					<Route path={wizardPages.OK}>
						<OKStep />
					</Route>
					<Route path={wizardPages.PAYMENT}>
						<PaymentStep selectedProducts={props.selectedProducts} />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

function createCategoryPages(props: Props) {

	if (!props.categoryProducts)
		return <div>no products</div>

	let pages: Array<JSX.Element> = Object.keys(props.categoryProducts).map((key, i) => {
		let category: Category | undefined = props.categories.find(e => e.name === key);

		if (category)
			return(
				<Route key={i} path={"/order/cat_" + category.name}>
					<ProductStep categoryProducts={props.categoryProducts}
								 category={category}
								 categories={props.categories}
								 nextURL={wizardPages.ADDRESS}/>
				</Route>)
		else
			return (
				<div>an error has occurred</div>)
	})
	return (pages)
}

const mapStateToProps = (state: AppState) => {
	return {
		categories: selectCategories(state),
		categoryProducts: state.products.categoryProducts,
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
