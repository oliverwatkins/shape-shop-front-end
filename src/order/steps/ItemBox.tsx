import * as React from 'react';
import type {Product} from "../../AppState";
import './itemBox.scss';
import {baseURL, company} from "../../constants";
import ShapeShopImage from "../../common/ShapeShopImage";

type Props = {
	product: Product,
	handleChangeSelection: (arg1: number, arg2: string) => void //qty, id
}

export default function ItemBox(props: Props) {

	let selected = ""
	let checked = false
	if (props.product.amount && props.product.amount > 0) {
		selected = "selected"
		checked = true
	}

	function handleChangeCheckbox(e: any) {
		if (e.currentTarget.checked) {
			props.handleChangeSelection(1, props.product.id)
		} else {
			props.handleChangeSelection(0, props.product.id)
		}
	}

	function handleChangeQuantity(e: any) {
		props.handleChangeSelection(e.currentTarget.value, props.product.id)
	}

	let baseurl = baseURL + "images/" + company + "/"

	return(
		<div className={"item item-box " + selected}>
			<ShapeShopImage product={props.product}/>

			<div className={"item-box-desc " + selected} title={props.product.name} >
				{props.product.name}
			</div>
			<div className={"item-box-bottom"} >
				<div className={"item-box-price"}>
					€ {props.product.price}
				</div>
				<input className={"item-box-checkbox"}
					   type="checkbox"
					   id="selectCheckbox"
					   checked={checked}
					   onChange={handleChangeCheckbox}/>
				<select className={"item-box-options"} id="qty" onChange={handleChangeQuantity} value={props.product.amount}>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
			</div>
		</div>
	)
}
