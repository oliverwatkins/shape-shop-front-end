import * as React from 'react';
import type {Product} from "../AppState";
import './itemBox.scss';

type Props = {
	product: Product
}


export class ItemBox extends React.PureComponent<Props> {

	render() {
		let selected = ""
		let checked = false
		if (this.props.product.quantity > 0) {
			selected = "selected"
			checked = true
		}

		// let imageFilename = "pizza.png"
		let imgSrc;
		try {
			imgSrc = require(`./../assets/img/${this.props.product.imageFilename}`)
		} catch (e) {
			console.info("attemptying to load : " + this.props.product.imageFilename);
			console.error(e);
		}




		return (
			<div className={"item-box " + selected}>
				<img className={"item-box-image"} src={imgSrc} alt="Pic of pizza"/>
				<div className={"item-box-desc " + selected} title={this.props.product.name} >
					{this.props.product.name}
				</div>
				<div className={"item-box-bottom"} >
					<div className={"item-box-price"}>
						 € {this.props.product.price}
					</div>
					<input className={"item-box-checkbox"}
								 type="checkbox"
								 id="selectCheckbox"

								 checked={checked}


								 onChange={this.handleChangeCheckbox}/>

					<select className={"item-box-options"} id="qty" onChange={this.handleChangeQuantity} value={this.props.product.quantity}>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>
			</div>
		);
	}

	handleChangeCheckbox = (e) => {
		if (e.currentTarget.checked) {
			this.props.handleChangeSelection(1, this.props.product.id)
		} else {
			this.props.handleChangeSelection(0, this.props.product.id)
		}
	}

	handleChangeQuantity = (e) => {
		this.props.handleChangeSelection(e.currentTarget.value, this.props.product.id)
	}
}

export default ItemBox;
