import * as React from 'react';
import OrderSummary from "./OrderSummary";
import {NextButton} from "./buttons/NextButton";
import {wizardPages as pages} from "./OrderWizardContainer";
import AddressSummary from "./AddressSummary";

import {BackButton} from "./buttons/BackButton";

import type {Address, Product} from "../AppState";
import {DeliveryType, PaymentType} from "../AppState";

type Props = {
	selectedProducts?: Array<Product>,
	selectedProducts2?: Array<Product>,
	address?: Address,
	deliveryType?: string,
	paymentType?: string,
}

function Summary(props: Props) {
	return (
		<div className="wizardPanel summary-step">
			<h2 className="wizardHeader">Summary</h2>
			<div className="wizardMain">
				<BackButton page={pages.WHICH_PAYMENT}/>
				<div className="wizardCenter">
					<h3><u>Order</u></h3>
					<OrderSummary selectedProducts={props.selectedProducts} selectedProducts2={props.selectedProducts2}/>

					<div>Delivery type -
						{props.deliveryType === DeliveryType.pickup && <span>
							<b> pickup</b></span>}
						{props.deliveryType === DeliveryType.delivery && <span>
							<b> delivery</b></span>}
					</div>

					{props.deliveryType === "delivery" && <AddressSummary address={props.address}/>}

					<div>Payment type -
						{props.paymentType === PaymentType.cash && <span>
							<b> cash</b></span>}
						{props.paymentType === PaymentType.card && <span>
							<b> card</b></span>}
					</div>
				</div>
				{props.paymentType === PaymentType.card && <span><NextButton label={"To Payment"} page={pages.PAYMENT}/></span>}
				{props.paymentType !== PaymentType.card && <span><NextButton label={"OK"} page={pages.OK}/></span>}
			</div>
		</div>
	);
}

export default Summary;
