import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';

// import CheckoutForm from "./stripe/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function PaymentSummary(props: any) {
	return (
		<div style={{display: "flex"}} className="wizardPanel">
		</div>
	);
}

export default PaymentSummary;
