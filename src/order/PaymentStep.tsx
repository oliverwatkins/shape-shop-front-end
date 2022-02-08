import * as React from 'react';
import {CheckoutForm} from "./stripe/PaymentForm";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSummary from "./OrderSummary";
import {calculateTotal} from "./utils";
import {wizardPages as pages} from "./OrderWizardContainer";
import {BackButton} from "./buttons/BackButton";

import "./order.scss"
import {createUpdateCreditCard} from "../admin/redux/productActions";
import {connect} from "react-redux";
// import {Address} from "./AddressStep";
import type {AppState, Product} from "../AppState";
import {CreditCardEntity} from "../AppState";
import {Redirect} from "react-router";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");


type Props = {
	updateCC: Function,
	creditCardEntity?: CreditCardEntity,
	selectedProducts?: Array<Product>,
	selectedProducts2?: Array<Product>
}

function PaymentStep(props: Props) {
	if(props.creditCardEntity){
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
							<CheckoutForm updateCC={props.updateCC} amount={calculateTotal(props.selectedProducts, props.selectedProducts2)}/>
						</Elements>
					</div>
				</div>
				<OrderSummary selectedProducts={props.selectedProducts} selectedProducts2={props.selectedProducts2}/>
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		updateCC: (value: any) => {
			console.info(" " + JSON.stringify(value))
			dispatch(createUpdateCreditCard(value));
		},
	};
};

const mapStateToProps = (state: AppState) => {
	return {
		creditCardEntity: state.order.creditCardEntity,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PaymentStep);
