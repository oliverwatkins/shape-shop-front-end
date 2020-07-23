import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import LoadingView from "../misc/LoadingView";
import type {Address, AppState, Product} from "../AppState";
import {
	selectOrder,
	selectProductType,
	selectSelectedProducts, selectSelectedProductType
} from "../selectors";
import {connect} from "react-redux";
import {createPlaceOrderAction} from "./redux/productActions";


type Props = {
	selectedProducts: Array<Product>,
	selectedProducts2: Array<Product>,
	address: Address,
	deliveryType: string,
	paymentType: string,
	submittingOrder: boolean,
	orderError: string,
}

export class OKStep extends React.PureComponent<Props> {

	constructor(props) {
		super();
		props.placeOrder(props.order);
	}

	render() {
		return (
			<div className={"okPanel"}>

				{this.props.orderError && <span className={"error"}>{this.props.orderError}</span>}

				{this.props.submittingOrder && <LoadingView/>}
				{!this.props.submittingOrder && !this.props.orderError &&
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
		products2: selectProductType(state, "accessories"),
		order: selectOrder(state),
		address: state.order && state.order.address,
		selectedProducts: selectSelectedProductType(state, "main"),
		selectedProducts2: selectSelectedProductType(state, "accessories"),
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
