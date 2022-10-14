import * as React from 'react';

import ItemBox from "./ItemBox";
import {createUpdateProductSelection} from "../admin/redux/productsReducer";
import {connect, useDispatch} from "react-redux";
import type {Product} from "../AppState";

type Props = {
	productItems?: Array<Product>,
}

export default function ProductSelection(props: Props) {
	let items = props.productItems;

	const dispatch = useDispatch();

	let updateProductSelection = (quantity: number, productId: string) => {
		dispatch(createUpdateProductSelection({value: quantity, productid: productId}));
	}

	return (
		<div>
			<div className="product-selection">
				{
					items && items.map((e) => (
						<ItemBox key={e.name} product={e} handleChangeSelection={updateProductSelection}/>
						)
					)
				}
			</div>
		</div>
	);
}

