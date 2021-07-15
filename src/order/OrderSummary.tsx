import * as React from 'react';
import type {Product} from "../AppState";
import {calculateTotal} from "./utils";

type Props = {
	selectedProducts?: Array<Product>,
	selectedProducts2?: Array<Product>,
}

export function OrderSummary(props: Props) {
	return (
		<div className={"order-summary"}>
			<table>
				<tbody>
				{props.selectedProducts2 && props.selectedProducts2.length > 0 && <tr>
					<td><h4>Drinks </h4></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				}
				{
					props.selectedProducts2 && props.selectedProducts2.map((elem: Product) => {
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
					props.selectedProducts && props.selectedProducts.map((elem: Product) => {
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
					<td>{calculateTotal(props.selectedProducts, props.selectedProducts2)}</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
}

function priceTimesQty(p, qty): string {
	let t: any = p * qty
	t = t.toFixed(2);
	return t
}

export default OrderSummary;
