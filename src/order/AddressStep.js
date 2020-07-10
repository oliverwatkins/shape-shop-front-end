import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruck} from "@fortawesome/free-solid-svg-icons";
import {Formik} from "formik";

import "./order.scss"
import {Redirect} from "react-router";
import {createUpdateAddress, createUpdateDeliveryType} from "./redux/productActions";
import {connect} from "react-redux";
import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
import {DeliveryType} from "../constants";

type Props = {
	updateAddress: (value, id)=>void,
	updateDeliveryType: (value)=>void
}

type State = {
	redirect: boolean,
	deliveryType: "DELIVERY" | "PICKUP",
}

export class Address extends React.PureComponent<Props, State> {

	constructor() {
		super();
		this.state = {
			redirect: false,
			deliveryType: DeliveryType.pickup,
		}
	}


	setRedirect() {
		this.setState({
			redirect: true
		})
	}

	onRadioChanged = (e) => {
		// throw "errored"
		this.setState({
			deliveryType: e.currentTarget.value,
		});
		this.props.updateDeliveryType(e.currentTarget.value)
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={pages.WHICH_PAYMENT}/>
		}


		return (
			<div className="wizardPanel address-step">

				<h2 className={"wizardHeader"}>Delivery or Pickup?</h2>
				<div className="wizardMain">
					<BackButton page={pages.DRINK_LIST}/>
					<div className="wizardCenter">

						<div className="icon-container">
							<FontAwesomeIcon icon={faTruck} style={{fontSize: "60px", color: "navy", margin: "25px"}}/>
						</div>

						<div>
							<input type="radio"
										 id="contactChoice1"
										 name="pckupOrDelivery"
										 value={DeliveryType.pickup}
										 onChange={this.onRadioChanged}
										 checked={this.state.deliveryType === DeliveryType.pickup}/>
							<label htmlFor="contactChoice1">Pickup</label>
							<input type="radio"
										 id="contactChoice2"
										 name="pckupOrDelivery"
										 value={DeliveryType.delivery}
										 checked={this.state.deliveryType === DeliveryType.delivery}
										 onChange={this.onRadioChanged}/>
							<label htmlFor="contactChoice2">Delivery</label>
						</div>

						{this.state.deliveryType && (this.state.deliveryType === DeliveryType.delivery) &&
						<Formik
							initialValues={{email: '', password: '', name: ''}}
							validate={validator}
							onSubmit={(values, blah) => {
								setTimeout(() => {
									// alert(JSON.stringify(values, null, 2));
									blah.setSubmitting(false);

									this.props.updateAddress(values);
									this.setRedirect()
								}, 400);
							}}>

							{({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
								<form onSubmit={handleSubmit} id="addressForm">
									<div>
										<label htmlFor="name">Name</label>
										<input
											id="name"
											type="text"
											name="name"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
										/>
										<span className={"error"}>
									{errors.name && touched.name && errors.name}
									</span>
									</div>
									<div>
										<label htmlFor="street">Strasse</label>
										<input
											id="street"
											type="text"
											name="street"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.street}
										/>
										<span className={"error"}>
									{errors.street && touched.street && errors.street}
									</span>
									</div>
									<div>
										<label htmlFor="postcode">Postleitzahl</label>
										<input
											id="postcode"
											type="text"
											name="postcode"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.postcode}
										/>
										<span className={"error"}>
									{errors.postcode && touched.postcode && errors.postcode}
									</span>
									</div>
									<div>
										<label htmlFor="tel">Telefon</label>
										<input
											id="tel"
											type="text"
											name="telephone"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.telephone}
										/>
										<span className={"error"}>
									{errors.telephone && touched.telephone && errors.telephone}
									</span>
									</div>
									<div>
										<label htmlFor="email">Email</label>
										<input
											id="email"
											type="email"
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
										/>
										<span className={"error"}>
									{errors.email && touched.email && errors.email}
									</span>
									</div>
									<button type="submit" disabled={isSubmitting}>
										Submit
									</button>
								</form>
							)}
						</Formik>
						}
					</div>
					{this.state.deliveryType === DeliveryType.delivery &&
					<NextButton label={"NEXT"} type={"submit"} form={"addressForm"}/>}

					{(this.state.deliveryType === DeliveryType.pickup) &&
					<NextButton label={"NEXT"} page={pages.WHICH_PAYMENT}/>}
				</div>
			</div>
		);
	}
}


let validator = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Name Required';
	}

	if (!values.email) {
		errors.email = 'Required';
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	) {
		errors.email = 'Invalid email address';
	}
	return errors;
}


const mapDispatchToProps = dispatch => {
	return {
		updateAddress: (value, id) => {
			dispatch(createUpdateAddress(value, id));
		},
		updateDeliveryType: (value) => {
			dispatch(createUpdateDeliveryType(value));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Address);