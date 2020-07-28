import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";


import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./buttons/NextButton";
import type {Product} from "../AppState";

type Props = {
	productItems: Array<Product>,
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
}

export class ProductList extends React.PureComponent<Props> {
	render() {
		return (
			<div className={"product-list-step"}>
				<div className="wizardPanel">
					<h2 className="wizardHeader">Mains</h2>
					<div className="wizardMain">
						<div className="wizardCenter">
							<ProductSelection productItems={this.props.productItems}/>
						</div>
						<div style={{textAlign: "right"}}>
							<NextButton label={"next"} page={pages.DRINK_LIST}/>
							<OrderSummary selectedProducts={this.props.selectedProducts} selectedProducts2={this.props.selectedProducts2}/>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductList;
