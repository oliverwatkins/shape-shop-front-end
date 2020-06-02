import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';

// import CheckoutForm from "./stripe/CheckoutForm";

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
