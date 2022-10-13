import * as React from 'react';

import ItemBox from "./ItemBox";
import {createUpdateProductSelection} from "../admin/redux/productsReducer";
import {connect} from "react-redux";
import type {Product} from "../AppState";

type Props = {
	productItems?: Array<Product>,
	updateProductSelection: (arg1: number, arg2: string) => void
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

//todo use dispatch hook
const mapDispatchToProps = (dispatch: any) => {
	return {
		updateProductSelection: (quantity: number, productId: string) => {
			dispatch(createUpdateProductSelection({value: quantity, productid: productId}));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(ProductSelection);

