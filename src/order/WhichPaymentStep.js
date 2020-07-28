import * as React from 'react';

import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
// import PaymentStep from "./PaymentPanel";
import {connect} from "react-redux";
import {PaymentType} from "../constants";
import {deliveryTypes} from "./AddressStep";
import {createUpdatePaymentType} from "./redux/productActions";


type Props = {
	updatePaymentType: (value)=>void
}

type State = {
	redirect: boolean,
	paymentType: string,
}



export class WhichPayment extends React.PureComponent<Props, State> {

	constructor() {
		super();
		this.state = {
			redirect: false,
			paymentType: PaymentType.cash
		}
	}

	onRadioChanged = (e) => {
		this.setState({
			paymentType: e.currentTarget.value,
		});
		this.props.updatePaymentType(e.currentTarget.value)
	}

	render() {

		console.info("this.state.delivery " + this.state.paymentType)

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
									 checked={this.state.paymentType === PaymentType.cash}
									 onChange={this.onRadioChanged}
						/>
						<label htmlFor="contactChoice2">Pay on arrival</label>
						<input type="radio"
									 id="choice2"
									 name="cashOrCard"
									 value={PaymentType.card}
									 checked={this.state.paymentType === PaymentType.card}
									 onChange={this.onRadioChanged}

						/>
						<label htmlFor="contactChoice1">Pay online now with credit card</label>
					</div>
					<NextButton label={"next"} page={pages.SUMMARY}/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updatePaymentType: (value, id) => {
			dispatch(createUpdatePaymentType(value, id));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(WhichPayment);

// export default WhichPayment;