import * as React from 'react';
import type {Product} from "../AppState";
import './itemBox.scss';

type Props = {
	product: Product
}


function ItemBox(props: Props) {

	let selected = ""
	let checked = false
	if (props.product.quantity > 0) {
		selected = "selected"
		checked = true
	}

	// let imageFilename = "pizza.png"
	let imgSrc;


	try {
		// http://localhost:8080/images/green_pasta.jpg

		imgSrc = require(`./../assetsX/img/${props.product.imageFilename}`)
	} catch (e) {
		console.info("attemptying to load : " + props.product.imageFilename);
		console.error(e);
	}

	function handleChangeCheckbox(e) {
		if (e.currentTarget.checked) {
			props.handleChangeSelection(1, props.product.id)
		} else {
			props.handleChangeSelection(0, props.product.id)
		}
	}

	function handleChangeQuantity(e) {
		props.handleChangeSelection(e.currentTarget.value, props.product.id)
	}

	return(
		<div className={"item-box " + selected}>


			<img className={"item-box-image"} src={"http://localhost:8080/images/" + props.product.imageFilename} alt="Pic of pizza"/>
			{/*<img className={"item-box-image"} src={imgSrc} alt="Pic of pizza"/>*!/*/}
			{/*// http://localhost:8080/images/green_pasta.jpg*/}


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
				<select className={"item-box-options"} id="qty" onChange={handleChangeQuantity} value={props.product.quantity}>
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

export default ItemBox;
