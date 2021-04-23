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

function Address(props) {

	const [redirect, setRedirect]  = React.useState(false);
	const [deliveryType, setDeliveryType]  = React.useState(DeliveryType.pickup);

	function onRadioChanged(e) {
		setDeliveryType(e.currentTarget.value)
		props.updateDeliveryType(e.currentTarget.value)
	}

	if (redirect) {
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

					<div className={"radioBox"}>
						<input type="radio"
							   id="contactChoice1"
							   name="pckupOrDelivery"
							   value={DeliveryType.pickup}
							   onChange={onRadioChanged}
							   checked={deliveryType === DeliveryType.pickup}/>
						<label htmlFor="contactChoice1">Pickup</label>
						<input type="radio"
							   id="contactChoice2"
							   name="pckupOrDelivery"
							   value={DeliveryType.delivery}
							   checked={deliveryType === DeliveryType.delivery}
							   onChange={onRadioChanged}/>
						<label htmlFor="contactChoice2">Delivery</label>
					</div>
					<Formik
						initialValues={{email: '', street: '', name: '', telephone: '', postcode: ''}}
						validate={validator}
						onSubmit={(values, blah) => {
							setTimeout(() => {
								blah.setSubmitting(false);
								props.updateAddress(values);
								setRedirect(true)
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
								{deliveryType && (deliveryType === DeliveryType.delivery) &&
								<div>
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
								</div>
								}
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
										type="text"
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
				</div>
				{/*<NextButton label={"next"} page={pages.ADDRESS}/>*/}
				<NextButton label={"next"} type={"submit"} form={"addressForm"}/>
			</div>
		</div>
	);
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
