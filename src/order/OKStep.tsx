import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import type {Address, AppState, OrderState, Product} from "../AppState";
import {
	selectOrder,
	selectProductsByType,
	selectSelectedProducts
} from "../selectors";
import {connect} from "react-redux";
import {createPlaceOrderAction} from "../admin/redux/productActions";
import {useEffect} from "react";
import {LoadingView} from "../misc/LoadingView";
import {DeliveryType, PaymentType} from "../AppState";


type Props = {
	selectedProducts: Array<Product>,
	// selectedProducts2: Array<Product>,
	address?: Address,
	deliveryType: string,
	paymentType: string,
	submittingOrder?: boolean,
	orderError?: string,
	placeOrder: Function,
	order: OrderState
}

function OKStep(props: Props) {

	useEffect(() => {
		props.placeOrder(props.order);
	}, []);

	return (
		<div className={"okPanel"}>
			{props.orderError && <span className={"error"}>{props.orderError}</span>}
			{props.submittingOrder && <LoadingView msg={"Placing Order"}/>}
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		placeOrder: (data: any) => {
			dispatch(createPlaceOrderAction(data));
		},
	};
};

// a view of an order
export type WhatIsThis = {
	products: Array<Product>,
	products2: Array<Product>,
	order: OrderState,
	address: Address | undefined,
	selectedProducts: Array<Product>,
	deliveryType: string,
	paymentType: PaymentType,
	submittingOrder: boolean | undefined,
	orderError: string | undefined
	// orderError: state.order && state.order.orderError
}

const mapStateToProps = (state: AppState): WhatIsThis => {
	return {
		products: selectProductsByType(state, "main"),
		products2: selectProductsByType(state, "drinks"),
		order: selectOrder(state),
		address: state.order && state.order.address,
		selectedProducts: selectSelectedProducts(state),
		// selectedProducts: selectSelectedProductByType(state, "main"),
		// selectedProducts2: selectSelectedProductByType(state, "drinks"),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
		orderError: state.order && state.order.orderError
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OKStep);
