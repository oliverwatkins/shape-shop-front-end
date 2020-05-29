import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";


import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./NextButton";
import type {Product} from "../AppState";

type Props = {
	productItems: Array<Product>,
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
}

export class ProductList extends React.PureComponent<Props> {
	render() {
		return (
			<div>
				<div className="wizardPanel">
					<h2 className="wizardHeader">Mains</h2>
					<div className="wizardMain">
						<div className="wizardCenter">
							<ProductSelection productItems={this.props.productItems}/>
						</div>
						<div style={{textAlign: "right"}}>
							<NextButton label={"NEXT"} page={pages.DRINK_LIST}/>
							<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductList;
