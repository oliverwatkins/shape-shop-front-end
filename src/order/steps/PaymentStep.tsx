import * as React from 'react';
import {CheckoutForm} from "../stripe/PaymentForm";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSummary from "../OrderSummary";
import {calculateTotal} from "../utils";
import {wizardPages as pages} from "../OrderWizardContainer";
import {BackButton} from "../buttons/BackButton";

import "../order.scss"
import {connect, useDispatch, useSelector} from "react-redux";
// import {Address} from "./AddressStep";
import type {AppState, Product} from "../../AppState";
import {CreditCardEntity} from "../../AppState";
import {Redirect} from "react-router";
import {updateCreditCardAction} from "../../admin/redux/orderReducer";
import {selectSelectedProducts} from "../../selectors";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function PaymentStep() {

	const creditCardEntity = useSelector((state: AppState) => state.order.creditCard)
	const selectedProducts = useSelector(selectSelectedProducts);

	const dispatch = useDispatch();

	const updateCC = (value: any) => {
		console.info(" " + JSON.stringify(value))
		dispatch(updateCreditCardAction(value));
	}

	if(creditCardEntity){
		return <Redirect to="/order/OK/" />
	}

	return (
		<div className="wizardPanel payment-panel">
			<h2 className="wizardHeader">Credit Card Payment</h2>
			<div className="wizardMain">
				<BackButton page={pages.SUMMARY}/>
				<div className="wizardCenter">
					<div className={"description"}>
						Please enter your credit card details and click 'Pay'
					</div>
					<div className={"stripe-payment-panel"}>
						<Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
							<CheckoutForm updateCC={updateCC} amount={calculateTotal(selectedProducts)}/>
						</Elements>
					</div>
				</div>
				<OrderSummary/>
			</div>
		</div>
	);
}

const ELEMENTS_OPTIONS = {
	fonts: [
		{
			cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
		},
	],
};


