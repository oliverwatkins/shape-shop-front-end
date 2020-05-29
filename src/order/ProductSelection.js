import * as React from 'react';

import "./../main.scss"

import ItemBox from "./ItemBox";
import {createUpdateProductSelection} from "./redux/productActions";
import {connect} from "react-redux";
import type {Product} from "../AppState";

type Props = {
	productItems: Array<Product>
}

export class ProductSelection extends React.PureComponent<Props> {
	render() {
		let items = this.props.productItems;
		return (
			<div>
				<div className="product-selection">
					{
						items && items.map((e) => (
							<ItemBox product={e} handleChangeSelection={this.props.updateProductSelection}/>
							)
						)
					}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateProductSelection: (value, id) => {
			dispatch(createUpdateProductSelection(value, id));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(ProductSelection);

