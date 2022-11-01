import * as React from 'react';

import {wizardPages as pages} from "../OrderWizardContainer"
import {NextButton} from "../buttons/NextButton";
import {BackButton} from "../buttons/BackButton";
import {useDispatch, useSelector} from "react-redux";
import {OrderState, PaymentType} from "../../AppState";
import {updatePaymentTypeAction} from "../../admin/redux/orderReducer";
import {selectOrder} from "../../selectors";

import "./whichPaymentStep.scss"

export default function WhichPayment() {
	const dispatch = useDispatch();

	let order: OrderState = useSelector(selectOrder);

	let paymentType = order.paymentType;

	function onRadioChanged(e: React.ChangeEvent<HTMLInputElement>){
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

					{/*TODO if delivery then text should read "pay at the door"*/}
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
