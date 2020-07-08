import * as React from "react";
import ProductListPanel from "./ProductListPanel";


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
					order
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
					<td> {order.name} </td>
					<td>
						<ProductListPanel products={order.selectedProducts}/>
					</td>
					<td className={"deliveryType"}> {order.deliveryType} </td>
					<td className={"paymentType"}> {order.paymentType} </td>
					<td>Date: {order.date} </td>
				</tr>
			)}
			</tbody>
		</table>)
}
