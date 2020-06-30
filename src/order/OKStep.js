import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import LoadingView from "../misc/LoadingView";
import type {Address, AppState, Product} from "../AppState";
import {selectDrinks, selectMains, selectOrder, selectSelectedDrinks, selectSelectedProducts} from "../selectors";
import {connect} from "react-redux";
import {createPlaceOrderAction} from "./redux/productActions";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
	address: Address,
	deliveryType: string,
	paymentType: string,
	submittingOrder: boolean
}

export class OKStep extends React.PureComponent<Props> {

	constructor(props) {
		super();
		props.placeOrder(props.order);
	}


	render() {
		return (
			<div className={"okPanel"}>
				{this.props.submittingOrder && <LoadingView/>}
				{!this.props.submittingOrder &&
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
		products: selectMains(state),
		drinks: selectDrinks(state),
		order: selectOrder(state),
		address: state.order && state.order.address,
		selectedProducts: selectSelectedProducts(state),
		selectedDrinks: selectSelectedDrinks(state),
		deliveryType: state.order && state.order.deliveryType,
		paymentType: state.order && state.order.paymentType,
		submittingOrder: state.order && state.order.submittingOrder,
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OKStep);
