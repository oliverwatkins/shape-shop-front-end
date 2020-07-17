import * as React from "react";
import {DeliveryType, PaymentType} from "../constants";


export default function OrderPanel(props) {
	return (
		<table className={"orderTable"}>
			<thead>
			<tr>
				<th>
					id
				</th>
				<th>
					name
				</th>
				<th>
					date / time
				</th>
				<th>
					order
				</th>
				<th>
					delivery/pickup
				</th>
				<th>
					cash/card
				</th>
			</tr>
			</thead>
			<tbody>
			{props.orders && props.orders.map(order =>
				<tr className={"orderBox"} key={order.id}>
					<td>{order.id} </td>
					<td> {order.addressEntity && order.addressEntity.name} </td>
					<td>{order.date} </td>
					<td>
						<ProductListPanel products={order.selectedProducts}/>
					</td>
					<td className={"deliveryType"}>
						{order.deliveryType}
						<AddressPanel address={order.addressEntity}/>
					</td>
					<td className={"paymentType"}>
						{order.paymentType}
						<CardPanel creditCard={order.creditCardEntity}/>
					</td>
				</tr>
			)}
			</tbody>
		</table>)
}


function AddressPanel(props) {
	if (!props.address)
		return <span> NO ADDRESS</span>;

	return (
		<div>
			<table>
				<tr>
					<td>{props.address.name && <span>{props.address.name}</span>}</td>
					<td>{props.address.street && <span>{props.address.street}</span>}</td>
					<td>{props.address.postcode && <span>{props.address.postcode}</span>}</td>
					<td>{props.address.telephone && <span>{props.address.telephone}</span>}</td>
					<td>{props.address.email && <span>{props.address.email}</span>}</td>
				</tr>
			</table>
		</div>
	)
}

function CardPanel(props) {
	if (!props.creditCard)
		return <span>  </span>;

	return (
		<div>
			<table>
				<tr>
					<td>{props.creditCard.number && <span>{props.creditCard.number}</span>}</td>
					<td>{props.creditCard.expDate && <span>{props.creditCard.expDate}</span>}</td>
					<td>{props.creditCard.name && <span>{props.creditCard.name}</span>}</td>
					<td>{props.creditCard.type && <span>{props.creditCard.type}</span>}</td>
				</tr>
			</table>
		</div>
	)
}

function ProductListPanel(props) {
	return (
		<table className={"prodcutListTable"}>
			<tbody>
			{props.products && props.products.map(order =>
				<tr className={"orderBox"} key={order.id}>
					<td>{order.name} </td>
					<td> {order.price} </td>
					<td> {order.type} </td>
				</tr>
			)}
			</tbody>
		</table>)
}