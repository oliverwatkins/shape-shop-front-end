import * as React from 'react';
import type {Product} from "../AppState";
// import pizza from './../assets/img/pizza.png';

type Props = {
	product: Product
}


export class ItemBox extends React.PureComponent<Props> {

	render() {
		let selected = ""
		if (this.props.product.quantity > 0) {
			selected = "selected"
		}

		// let imageFilename = "pizza.png"
		let imgSrc;
		try {
			imgSrc = require(`./../assets/img/${this.props.product.imageFilename}`)
		} catch (e) {

			console.info("attemptying to load : " + this.props.product.imageFilename);

			console.error(e);
		}

		// style={{display:"flex"}}
		return (
			<div className={selected}>
				<img src={imgSrc} alt="Pic of pizza" width={160}/>

				<div title={this.props.product.name} style={{height:"70px", overflow: "hidden", fontSize:14}}>
					{this.props.product.name}
				</div>

				<div style={{display:"flex", justifyContent:"space-between"}}>

					<div style={{flexGrow:4}}>
						<b> € {this.props.product.price}</b>
					</div>

					<input style={{flexGrow:1}} type="checkbox"
								 id="selectCheckbox"
								 onChange={this.handleChangeCheckbox}/>

					<select  style={{flexGrow:2}} id="qty" onChange={this.handleChangeQuantity} value={this.props.product.quantity}>
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
