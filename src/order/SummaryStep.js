import * as React from 'react';
import OrderSummary from "./OrderSummary";
import {NextButton} from "./NextButton";
import {wizardPages as pages} from "./OrderWizard";
import AddressSummary from "./AddressSummary";
import type {Address, Product} from "../AppState";
import PaymentSummary from "./PaymentSummary";
import {BackButton} from "./BackButton";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
	address: Address,
	deliveryType: string,
}


export class Summary extends React.PureComponent<Props> {
	render() {
		return (
			<div className="wizardPanel">
				<h2 className="wizardHeader">Summary</h2>
				<div className="wizardMain">
					<BackButton page={"/order/address??"}/>
					<div className="wizardCenter">
						<h3>Order</h3>
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>
						<h3>Delivery Type</h3>
						<h4>
							{this.props.deliveryType}
						</h4>

						{this.props.deliveryType === "delivery" &&
						<AddressSummary address={this.props.address}/>}

						<h3>Payment Type</h3>

						<h4>pay at door</h4>

						<PaymentSummary/>
					</div>
					<NextButton label={"OK"} page={pages.OK}/>
				</div>
			</div>
		);
	}
}

export default Summary;
