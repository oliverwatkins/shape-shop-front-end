import * as React from 'react';
import OrderSummary from "../OrderSummary";
import {NextButton} from "../buttons/NextButton";
import {wizardPages as pages} from "../OrderWizardContainer";
import AddressSummary from "../AddressSummary";

import {BackButton} from "../buttons/BackButton";

import type {Address, Product} from "../../AppState";
import {DeliveryType, PaymentType} from "../../AppState";
import {useSelector} from "react-redux";
import {selectOrder} from "../../selectors";

type Props = {
	// selectedProducts?: Array<Product>,
	// selectedProducts2?: Array<Product>,
	// address?: Address,
	// deliveryType?: string,
	// paymentType?: string,
}

function Summary(props: Props) {

	let order = useSelector(selectOrder);

	return (
		<div className="wizardPanel summary-step">
			<h2 className="wizardHeader">Summary</h2>
			<div className="wizardMain">
				<BackButton page={pages.WHICH_PAYMENT}/>
				<div className="wizardCenter">

					<OrderSummary/>

					<div>
						{order.deliveryType === DeliveryType.PICKUP && <span><h3> pickup</h3></span>}
						{order.deliveryType === DeliveryType.DELIVERY && <span><h3> delivery</h3></span>}
					</div>
					{<AddressSummary address={order.address}/>}
					<h3>Payment with
						{order.paymentType === PaymentType.CASH && <span> cash</span>}
						{order.paymentType === PaymentType.CARD && <span> card</span>}
					</h3>
				</div>



				{order.paymentType === PaymentType.CARD && <span><NextButton label={"To Payment"} page={pages.PAYMENT} disabled={false}/></span>}
				{order.paymentType !== PaymentType.CARD && <span><NextButton label={"OK"} page={pages.OK} disabled={false}/></span>}
			</div>
		</div>
	);
}

export default Summary;
