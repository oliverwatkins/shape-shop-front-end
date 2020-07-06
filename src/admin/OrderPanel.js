import * as React from "react";


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
					delivery/pickup
				</th>
				<th>
					cash/card
				</th>
				<th>
					address
				</th>
			</tr>
			</thead>
			<tbody>
			{props.orders && props.orders.map(order =>
				<tr className={"orderBox"} key={order.id}>
					<td>{order.id} </td>
					<td>Date: {order.date} </td>
					<td>Descrpition: {order.description} </td>
					<td className={"deliveryType"}> {order.deliveryType} </td>
					<td className={"paymentType"}> {order.paymentType} </td>
				</tr>
			)}
			</tbody>
		</table>)
}
