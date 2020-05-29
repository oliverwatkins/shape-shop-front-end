import * as React from 'react';
import type {Product} from "../AppState";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
}

export function OrderSummary(props: Props) {

	let style = {
		background: "white",
		width: 500
	}

	let styleTD = {
		padding: "5px 9px 12px 23px"
	}

	return (
		<div style={style}>
			{/*<h4>Order : </h4>*/}
			<table>
				<tr>
					<td style={styleTD}>Drinks </td>
					<td style={styleTD}></td>
					<td style={styleTD}></td>
					<td style={styleTD}></td>
				</tr>




				{
					props.selectedDrinks.map((elem: Product) => {
						return <tr>
							<td style={styleTD}>{elem.name}</td>
							<td style={styleTD}>{elem.price}</td>
							<td style={styleTD}>{elem.quantity > 1 ? elem.quantity : " "}</td>
							<td style={styleTD}>{priceTimesQty(elem.price, elem.quantity)}</td>
						</tr>
					})
				}

				<tr>
					<td style={styleTD}>Mains </td>
					<td style={styleTD}></td>
					<td style={styleTD}></td>
					<td style={styleTD}></td>
				</tr>

				{
					props.selectedProducts.map((elem: Product) => {
						return <tr>
							<td style={styleTD}>{elem.name}</td>
							<td style={styleTD}>{elem.price}</td>
							<td style={styleTD}>{elem.quantity > 1 ? elem.quantity : " "}</td>
							<td style={styleTD}>{priceTimesQty(elem.price, elem.quantity)}</td>
						</tr>
					})
				}
				<tr>
					<td style={styleTD}></td>
					<td style={styleTD}><b>Total:</b></td>
					<td style={styleTD}></td>
					<td style={styleTD}>{calculateTotal(props.selectedProducts)}</td>
				</tr>
			</table>
		</div>
	);
}

function priceTimesQty(p, qty) {
	let t = p * qty
	t = t.toFixed(2);
	return t

}

function calculateTotal(selectedProducts) {

	let t = selectedProducts.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	t = t.toFixed(2);
	return t
}

export default OrderSummary;