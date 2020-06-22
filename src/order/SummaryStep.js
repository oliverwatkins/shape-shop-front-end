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
			<div className="wizardPanel summary-step">
				<h2 className="wizardHeader">Summary</h2>
				<div className="wizardMain">
					<BackButton page={pages.WHICH_PAYMENT}/>
					<div className="wizardCenter">
						<h3>Order</h3>
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>

						<h3>Delivery Type :
							{this.props.deliveryType === "pickup" && <span>pickup</span>}
							{this.props.deliveryType === "delivery" && <span>delivery</span>}
						</h3>

						{this.props.deliveryType === "delivery" &&
						<AddressSummary address={this.props.address}/>}

						{/*{this.props.deliveryType === "pickup" &&*/}
						{/*<span>Pickup!</span>}*/}

						<h3>Payment Type:
							{this.props.paymentType === "cash" && <span>cash</span>}
							{this.props.paymentType === "card" && <span>card</span>}
						</h3>

						{/*{this.props.paymentType === "cash" &&*/}
						{/*<span>cash!</span>*/}
						{/*}*/}
						{/*{this.props.paymentType === "card" &&*/}
						{/*<span>card!</span>*/}
						{/*}*/}

						{/*<PaymentSummary/>*/}
					</div>
					<NextButton label={"OK"} page={pages.OK}/>
				</div>
			</div>
		);
	}
}

export default Summary;
