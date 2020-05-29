import * as React from 'react';
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faArrowCircleLeft, faArrowCircleRight, faCreditCard} from "@fortawesome/free-solid-svg-icons";

// import CheckoutForm from "./stripe/CheckoutForm";

import CheckoutForm from "./stripe/SplitForm";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export class PaymentSummary extends React.PureComponent {
	render() {
		return (
			<div style={{display: "flex"}} className="wizardPanel">



				$10
			</div>
		);
	}
}

export default PaymentSummary;
