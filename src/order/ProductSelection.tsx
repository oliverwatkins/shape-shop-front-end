import * as React from 'react';

import ItemBox from "./ItemBox";
import {createUpdateProductSelection} from "../admin/redux/productActions";
import {connect} from "react-redux";
import type {Product} from "../AppState";

type Props = {
	productItems?: Array<Product>,
	updateProductSelection: Function
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		updateProductSelection: (value: any, id: any) => {
			dispatch(createUpdateProductSelection(value, id));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(ProductSelection);

