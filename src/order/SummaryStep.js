import * as React from 'react';
import OrderSummary from "./OrderSummary";
import {NextButton} from "./buttons/NextButton";
import {wizardPages as pages} from "./OrderWizard";
import AddressSummary from "./AddressSummary";

import {DeliveryType, PaymentType} from "../constants";

import {BackButton} from "./buttons/BackButton";

import type {Address, Product} from "../AppState";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
	address: Address,
	deliveryType: string,
	paymentType: string,
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

						{this.props.deliveryType === "delivery" && <AddressSummary address={this.props.address}/>}

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
					{this.props.paymentType === PaymentType.card && <span><NextButton label={"To Payment"} page={pages.PAYMENT}/></span>}
					{this.props.paymentType !== PaymentType.card && <span><NextButton label={"OK"} page={pages.OK}/></span>}
				</div>
			</div>
		);
	}
}

export default Summary;
