import * as React from 'react';

import ItemBox from "./ItemBox";
import {updateProductSelection} from "../../admin/redux/productsReducer";
import {connect, useDispatch} from "react-redux";
import type {Product} from "../../AppState";

import "./productSelection.scss"

type Props = {
	productItems?: Array<Product>,
}


/**
 * Product central area
 */
export default function ProductSelection(props: Props) {
	let items = props.productItems;

	const dispatch = useDispatch();

	let updateProdSelection = (quantity: number, productId: string) => {
		dispatch(updateProductSelection({value: quantity, productid: productId}));
	}

	return (
		<div className="product-selection wiz-item wizardStep">
			{
				items && items.map((e) => (
					<ItemBox key={e.name} product={e} handleChangeSelection={updateProdSelection}/>
					)
				)
			}
		</div>
	);
}

