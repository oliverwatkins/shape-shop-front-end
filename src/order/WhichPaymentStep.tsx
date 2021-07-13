import * as React from 'react';

import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
import {connect} from "react-redux";
import {DeliveryType, PaymentType} from "../constants";
import {createUpdatePaymentType} from "./redux/productActions";

type Props = {
	updatePaymentType: (value: any)=>void
}


function WhichPayment(props: Props) {

	const [paymentType, setPaymentType]  = React.useState(PaymentType.cash);
	const [redirect, setRedirect]  = React.useState(false);

	function onRadioChanged(e: React.ChangeEvent<HTMLInputElement>){
		setPaymentType(e.currentTarget.value)
		props.updatePaymentType(e.currentTarget.value)
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
				<NextButton label={"next"} page={pages.SUMMARY}/>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		updatePaymentType: (value: any) => {
			dispatch(createUpdatePaymentType(value));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(WhichPayment);
