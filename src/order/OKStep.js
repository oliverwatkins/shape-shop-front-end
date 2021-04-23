import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import LoadingView from "../misc/LoadingView";
import type {Address, AppState, Product} from "../AppState";
import {
	selectOrder,
	selectProductType,
	selectSelectedProductType
} from "../selectors";
import {connect} from "react-redux";
import {createPlaceOrderAction} from "./redux/productActions";
import {useEffect} from "react";


type Props = {
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
	address: Address,
	deliveryType: string,
	paymentType: string,
	submittingOrder: boolean,
	orderError: string,
}

function OKStep(props: Props) {

	useEffect(() => {
		props.placeOrder(props.order);
	}, []);

	return (
		<div className={"okPanel"}>
			{props.orderError && <span className={"error"}>{props.orderError}</span>}
			{props.submittingOrder && <LoadingView/>}
			{!props.submittingOrder && !props.orderError &&
			<div>
				<div>
					<h1>OK</h1>
				</div>
				Order has been placed!
				<div>
					<FontAwesomeIcon size={"10x"} color={"green"} className={"icon"} icon={faCheckCircle}/>
				</div>
			</div>
			}
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		placeOrder: (data) => {
			dispatch(createPlaceOrderAction(data));
		},
	};
};

const mapStateToProps = (state: AppState) => {
	return {
		products: selectProductType(state, "main"),
		products2: selectProductType(state, "drinks"),
		order: selectOrder(state),
		address: state.order && state.order.address,
		selectedProducts: selectSelectedProductType(state, "main"),
		selectedProducts2: selectSelectedProductType(state, "drinks"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
		orderError: state.order && state.order.orderError,
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OKStep);
