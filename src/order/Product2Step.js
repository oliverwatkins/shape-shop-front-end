import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";


import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./buttons/NextButton";
import type {Product} from "../AppState";
import {BackButton} from "./buttons/BackButton";

type Props = {
	products2: Array<Product>,
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
}

//redundant
export class Product2Step extends React.PureComponent<Props> {
	render() {
		return (
			<div className="wizardPanel products2-step">
				<h2 className={"wizardHeader"}>Maybe some Accesories?</h2>
				<div className={"wizardMain"}>
					<BackButton page={pages.PRODUCT_LIST}/>
					<div className="wizardCenter">
						<ProductSelection productItems={this.props.products2}/>
					</div>
					<div style={{textAlign: "right"}}>
						<NextButton label={"next"} page={pages.ADDRESS}/>
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedProducts2={this.props.selectedProducts2}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Product2Step;
