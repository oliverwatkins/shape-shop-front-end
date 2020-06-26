import * as React from 'react';
import {CheckoutForm} from "./stripe/HooksExample";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSummary from "./OrderSummary";
import {calculateTotal} from "./utils";
import {wizardPages as pages} from "./OrderWizard";
import {BackButton} from "./buttons/BackButton";

// import CheckoutForm from "./stripe/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export class PaymentStep extends React.PureComponent {
	render() {

		return (
			<div className="wizardPanel">
				<h2 className="wizardHeader">Credit Card Payment</h2>
				<div className="wizardMain">
					<BackButton page={pages.SUMMARY}/>
					<div className="wizardCenter">
						<div>
							Please enter your credit card details and click 'Pay'
						</div>
						<div className={"stripe-payment-panel"}>
							<Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
								<CheckoutForm amount={calculateTotal(this.props.selectedProducts, this.props.selectedDrinks)}/>
							</Elements>
						</div>
					</div>
					<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>
				</div>
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
