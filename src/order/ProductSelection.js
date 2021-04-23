import * as React from 'react';

// import "./../main.scss"

import ItemBox from "./ItemBox";
import {createUpdateProductSelection} from "./redux/productActions";
import {connect} from "react-redux";
import type {Product} from "../AppState";

type Props = {
	productItems: Array<Product>
}

function ProductSelection(props: Props) {
	let items = props.productItems;

	return (
		<div>
			<div className="product-selection">
				{
					items && items.map((e) => (
						<ItemBox key={e.name} product={e} handleChangeSelection={props.updateProductSelection}/>
						)
					)
				}
			</div>
		</div>
	);
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

