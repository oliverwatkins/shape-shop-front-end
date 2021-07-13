import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";


import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import type {Product} from "../AppState";
import {BackButton} from "./buttons/BackButton";

type Props = {
	products2: Array<Product>,
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
}

//redundant
function Product2Step(props: Props) {
	return (
		<div className="wizardPanel products2-step">
			<h2 className={"wizardHeader"}>Maybe some drinks?</h2>
			<div className={"wizardMain"}>
				<BackButton page={pages.PRODUCT_LIST}/>
				<div className="wizardCenter">
					<ProductSelection productItems={props.products2}/>
				</div>
				<div style={{textAlign: "right"}}>
					<NextButton label={"next"} page={pages.ADDRESS}/>
					<OrderSummary selectedProducts={props.selectedProducts} selectedProducts2={props.selectedProducts2}/>
				</div>
			</div>
		</div>
	);
}

export default Product2Step;
