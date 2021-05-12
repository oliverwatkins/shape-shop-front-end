import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";
import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import type {Product} from "../AppState";

type Props = {
	productItems: Array<Product>,
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
}

function Product1Step(props: Props) {
	return (
		<div className="wizardPanel products1-step">
			<h2 className="wizardHeader">Mains</h2>
			<div className="wizardMain">
				<div className="wizardCenter">
					<ProductSelection productItems={props.productItems}/>
				</div>
				<div style={{textAlign: "right"}}>
					<NextButton label={"next"} page={pages.DRINK_LIST}/>
					<OrderSummary selectedProducts={props.selectedProducts} selectedProducts2={props.selectedProducts2}/>
				</div>
			</div>
		</div>
	);
}

export default Product1Step;
