import * as React from 'react';
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faArrowCircleLeft, faArrowCircleRight, faCreditCard} from "@fortawesome/free-solid-svg-icons";

// import CheckoutForm from "./stripe/CheckoutForm";

import {CheckoutForm} from "./stripe/HooksExample";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export class PaymentStep extends React.PureComponent {
	render() {
		return (
			<div className="payment-panel">

				Please enter your credit card details

				{/*<Elements stripe={stripePromise}>*/}
				{/*	<CheckoutForm />*/}
				{/*</Elements>*/}
				<Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
					<CheckoutForm />
				</Elements>
			</div>
		);
	}
}

const ELEMENTS_OPTIONS = {
	fonts: [
		{
			cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
		},
	],
};

export default PaymentStep;
