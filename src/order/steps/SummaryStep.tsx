import * as React from 'react';
import OrderSummary from "../OrderSummary";
import {NextButton} from "../buttons/NextButton";
import {wizardPages as pages} from "../OrderWizardContainer";
import AddressSummary from "../AddressSummary";

import {BackButton} from "../buttons/BackButton";

import {DeliveryType, PaymentType} from "../../AppState";
import {useSelector} from "react-redux";
import {selectOrder} from "../../selectors";
import Header from "./Header";

function Summary() {

	let order = useSelector(selectOrder);

	return (
		<div className="wiz-container summary-step">

			{/*TODO figure out how to use empty space with CSS Grid (and get rid of this) :*/}
			<div className={"emptySpace"}/>
			<Header text={"Summary"}/>
			<BackButton page={pages.WHICH_PAYMENT}/>
			<div>
				<OrderSummary/>
				<AddressSummary order={order}/>
				<h4>Payment with
					{order.paymentType === PaymentType.CASH && <span> cash</span>}
					{order.paymentType === PaymentType.CARD && <span> card</span>}
				</h4>
			</div>
			{order.paymentType === PaymentType.CARD && <span><NextButton label={"To Payment"} page={pages.PAYMENT} disabled={false}/></span>}
			{order.paymentType !== PaymentType.CARD && <span><NextButton label={"OK"} page={pages.OK} disabled={false}/></span>}
		</div>
	);
}

export default Summary;
