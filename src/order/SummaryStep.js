import * as React from 'react';
import OrderSummary from "./OrderSummary";
import {NextButton} from "./buttons/NextButton";
import {wizardPages as pages} from "./OrderWizard";
import AddressSummary from "./AddressSummary";
import type {Address, DeliveryType, PaymentType, Product} from "../AppState";
import {BackButton} from "./buttons/BackButton";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
	address: Address,
	deliveryType: DeliveryType,
	paymentType: PaymentType,
}


export class Summary extends React.PureComponent<Props> {
	render() {
		return (
			<div className="wizardPanel">
				<h2 className="wizardHeader">Summary</h2>
				<div className="wizardMain">
					<BackButton page={"/order/address??"}/>
					<div className="wizardCenter">
						<h2>Order</h2>
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>

						<h4>Delivery Type</h4>


						{this.props.deliveryType === "delivery" &&
						<AddressSummary address={this.props.address}/>}

						{this.props.deliveryType === "pickup" &&
						<span>Pickup!</span>}

						<h4>Payment Type</h4>

						{this.props.paymentType === "cash" &&
						<span>cash!</span>
						}
						{this.props.paymentType === "card" &&
						<span>card!</span>
						}

						{/*<PaymentSummary/>*/}
					</div>
					<NextButton label={"OK"} page={pages.OK}/>
				</div>
			</div>
		);
	}
}

export default Summary;
