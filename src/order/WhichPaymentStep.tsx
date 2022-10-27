import * as React from 'react';

import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
import {connect, useDispatch} from "react-redux";
import {PaymentType} from "../AppState";
import {updatePaymentTypeAction} from "../admin/redux/orderReducer";

export default function WhichPayment() {
	const dispatch = useDispatch();

	const [paymentType, setPaymentType]  = React.useState(PaymentType.cash);

	function onRadioChanged(e: React.ChangeEvent<HTMLInputElement>){
		// @ts-ignore
		setPaymentType(PaymentType[e.currentTarget.value])

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
						   value={PaymentType.cash}
						   checked={paymentType === PaymentType.cash}
						   onChange={onRadioChanged}
					/>
					<label htmlFor="contactChoice2">Pay on arrival</label>
					<input type="radio"
						   id="choice2"
						   name="cashOrCard"
						   value={PaymentType.card}
						   checked={paymentType === PaymentType.card}
						   onChange={onRadioChanged}
					/>
					<label htmlFor="contactChoice1">Pay online now with credit card</label>
				</div>
				<NextButton disabled={false} label={"next"} page={pages.SUMMARY}/>
			</div>
		</div>
	);
}
