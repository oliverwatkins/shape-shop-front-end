import * as React from 'react';
import type {Address, OrderState} from "../AppState";
import {DeliveryType} from "../AppState";

type Props = {
	address?: Address
	order: OrderState
}

export function AddressSummary(props: Props) {
	return (
		<div className={"order-summary"}>
			{/*<h3>pickups</h3>*/}
			<div>
				{props.order.deliveryType === DeliveryType.PICKUP && <span><h3> pickup</h3></span>}
				{props.order.deliveryType === DeliveryType.DELIVERY && <span><h3> delivery</h3></span>}
			</div>
			<table>
			{props.order.address &&
				<tbody>
				<tr><td><h4>name </h4>{props.order.address.name} </td>
					<td><h4>telephone: </h4>{props.order.address.telephone} </td></tr>
					<tr><td><h4>email</h4>{props.order.address.email}</td></tr>
					{props.order.address.street && <tr><b>Street:</b>{props.order.address.street}</tr>}
					{props.order.address.postcode && <tr><b>Postcode:</b>{props.order.address.postcode}</tr>}
				</tbody>}
			</table>
		</div>
	);
}

export default AddressSummary;
