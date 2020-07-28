import * as React from 'react';
import OrderSummary from "./OrderSummary";
import {NextButton} from "./buttons/NextButton";
import {wizardPages as pages} from "./OrderWizard";
import AddressSummary from "./AddressSummary";

import {DeliveryType, PaymentType} from "../constants";

import {BackButton} from "./buttons/BackButton";

import type {Address, Product} from "../AppState";


import {faTruck} from "@fortawesome/free-solid-svg-icons";
import {faHandHolding} from "@fortawesome/free-solid-svg-icons";
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";

import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
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
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedProducts2={this.props.selectedProducts2}/>

						<div>Delivery type :
							{this.props.deliveryType === DeliveryType.pickup && <span><FontAwesomeIcon icon={faHandHolding} style={{fontSize: "14px", color: "pink", margin: "1px"}}/> pickup</span>}
							{this.props.deliveryType === DeliveryType.delivery && <span><FontAwesomeIcon icon={faTruck} style={{fontSize: "14px", color: "blue", margin: "1px"}}/> delivery</span>}
						</div>

						{this.props.deliveryType === "delivery" && <AddressSummary address={this.props.address}/>}

						{/*{this.props.deliveryType === "pickup" &&*/}
						{/*<span>Pickup!</span>}*/}

						<div>Payment type :
							{this.props.paymentType === PaymentType.cash && <span><FontAwesomeIcon icon={faMoneyBill} style={{fontSize: "14px", color: "green", margin: "1px"}}/> cash</span>}
							{this.props.paymentType === PaymentType.card && <span><FontAwesomeIcon icon={faCreditCard} style={{fontSize: "14px", color: "blue", margin: "1px"}}/> card</span>}
						</div>

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
