import * as React from 'react';
import {useSelector} from "react-redux";
import {selectCategoriesFromProducts} from "../selectors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Summary from "./steps/SummaryStep";
import WhichPayment from "./steps/WhichPaymentStep";
import OKStep from "./steps/OKStep";
import type {AppState, Category, Product} from "../AppState";
import PaymentStep from "./steps/PaymentStep";
import AddressStep from "./steps/AddressStep";
import ProductStep from "./steps/ProductStep";

// import "./order.scss"
import useProductsAndCategories from "../hook/useProductsAndCategories";

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

export default function OrderWizardContainer() {


	let [loading, error] = useProductsAndCategories();

	let categories = useSelector(selectCategoriesFromProducts)
	// let categories = useSelector(selectCategoriesWithProducts)


	let categoryProducts = useSelector((state: AppState) => state.products.categoryProducts)
	let productsError = useSelector((state: AppState) => state.products.productsError)

	return (
		<div className={"order-wizard"}>
			{productsError && <span className={"error"}>{productsError}</span>}
			<Router>
				<Switch>
					{createCategoryPages(categoryProducts, categories)}
					<Route path={wizardPages.ADDRESS}>
						<AddressStep/>
					</Route>
					<Route path={wizardPages.WHICH_PAYMENT}>
						<WhichPayment/>
					</Route>
					<Route path={wizardPages.SUMMARY}>
						<Summary/>
					</Route>
					<Route path={wizardPages.OK}>
						<OKStep />
					</Route>
					<Route path={wizardPages.PAYMENT}>
						<PaymentStep />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

function createCategoryPages(categoryProducts: { [category: string]: Array<Product> } | undefined, categories: Category[]) {

	if (!categoryProducts)
		return <div>no products</div>

	let pages: Array<JSX.Element> = Object.keys(categoryProducts).map((key, i) => {
		let category: Category | undefined = categories.find(e => e.name === key);

		if (category)
			return(
				<Route key={i} path={"/order/cat_" + category.name}>
					<ProductStep categoryProducts={categoryProducts}
								 category={category}
								 categories={categories}
								 nextURL={wizardPages.ADDRESS}/>
				</Route>)
		else
			return (
				<div>an error has occurred!!!</div>)
	})
	return (pages)
}
