import * as React from 'react';

import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
import {connect, useDispatch} from "react-redux";
import {PaymentType} from "../AppState";
import {updatePaymentTypeAction} from "../admin/redux/orderReducer";

export default function WhichPayment() {
	const dispatch = useDispatch();

	const [paymentType, setPaymentType]  = React.useState(PaymentType.CASH);

	function onRadioChanged(e: React.ChangeEvent<HTMLInputElement>){

		let radioVal = e.currentTarget.value;

		if (radioVal === "CASH") {
			setPaymentType(PaymentType.CASH)
		} else if (radioVal === "CARD") {
			setPaymentType(PaymentType.CARD)
		}

		dispatch(updatePaymentTypeAction({value: e.currentTarget.value}));
	}

	return (
		<div className="wizardPanel payment-step">
			<h2 className="wizardHeader">How do you wish to pay?</h2>
			<div className="wizardMain">
				<BackButton page={pages.ADDRESS}/>
				<div className="wizardCenter">
					<input type="radio"
						   id="choice1"
						   name="cashOrCard"
						   value={PaymentType.CASH}
						   checked={paymentType === PaymentType.CASH}
						   onChange={onRadioChanged}
					/>
					<label htmlFor="contactChoice2">Pay on arrival</label>
					<input type="radio"
						   id="choice2"
						   name="cashOrCard"
						   value={PaymentType.CARD}
						   checked={paymentType === PaymentType.CARD}
						   onChange={onRadioChanged}
					/>
					<label htmlFor="contactChoice1">Pay online now with credit card</label>
				</div>
				<NextButton disabled={false} label={"next"} page={pages.SUMMARY}/>
			</div>
		</div>
	);
}
