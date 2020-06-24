import * as React from 'react';
import type {Product} from "../AppState";


type Props = {
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,
}

export function OrderSummary(props: Props) {

	return (
		<div className={"order-summary"}>
			{/*<h4>Order : </h4>*/}
			<table>
				<tbody>
				{props.selectedDrinks && props.selectedDrinks.length > 0 && <tr>
					<td><h4>Drinks </h4></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				}

				{
					props.selectedDrinks.map((elem: Product) => {
						return <tr key={elem.name}>
							<td>{elem.name}</td>
							<td>{elem.price}</td>
							<td>{elem.quantity > 1 ? elem.quantity : " "}</td>
							<td>{priceTimesQty(elem.price, elem.quantity)}</td>
						</tr>
					})
				}

				{props.selectedProducts && props.selectedProducts.length > 0 &&

				<tr>
					<td><h4>Mains </h4></td>
					<td/>
					<td/>
					<td/>
				</tr>
				}

				{
					props.selectedProducts.map((elem: Product) => {
						return <tr key={elem.name}>
							<td>{elem.name}</td>
							<td>{elem.price}</td>
							<td>{elem.quantity > 1 ? elem.quantity : " "}</td>
							<td>{priceTimesQty(elem.price, elem.quantity)}</td>
						</tr>
					})
				}
				<tr>
					<td></td>
					<td><b>Total:</b></td>
					<td></td>
					<td>{calculateTotal(props.selectedProducts, props.selectedDrinks)}</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
}

function priceTimesQty(p, qty) {
	let t = p * qty
	t = t.toFixed(2);
	return t

}

function calculateTotal(selectedProducts, selectedDrinks) {

	let d = selectedDrinks.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	let t = selectedProducts.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	t = (t + d).toFixed(2);

	// d = d.toFixed(2);
	return t
}

export default OrderSummary;