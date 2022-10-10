import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";
import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import type {Category, Product} from "../AppState";

type Props = {
	categoryProducts: { [category: string]: Array<Product> },
	category: Category,
	categories: Array<Category>,
	selectedProducts?: Array<Product>,
	nextURL: string
}

function ProductStep(props: Props) {

	if (!props.category)
		throw "no category"

	return (
		<div className="wizardPanel products1-step">
			<h2 className="wizardHeader">{props.category.name}</h2>
			<div className="wizardMain">
				<div className="wizardCenter">
					<ProductSelection productItems={props.categoryProducts[props.category.name]}/>
				</div>
				<div style={{textAlign: "right"}}>
					<NextButton label={"next"} page={getNextPageURL(props)}/>
					<OrderSummary selectedProducts={props.selectedProducts}/>
				</div>
			</div>
		</div>
	);
}

function getNextPageURL(props: Props) {
	let c = getNextCageory(props.category, props.categories)
	if (c)
		return "/order/cat_" + c.name;
	else
		return props.nextURL;
}

function getNextCageory(category: Category, categories: Array<Category>): Category | undefined {
	let c = categories.find(element => element.name === category.name)
	if (c) {
		let i = categories.indexOf(c);

		if (i + 1 >= categories.length) {
			return undefined
		}
		return categories[i + 1];
	}else {
		throw "no category here"
	}
}

export default ProductStep;