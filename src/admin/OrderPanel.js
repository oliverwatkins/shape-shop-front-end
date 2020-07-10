import * as React from "react";
import ProductListPanel from "./ProductListPanel";
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
					date
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
					<td> {order.name} </td>
					<td>Date: {order.date} </td>
					<td>
						<ProductListPanel products={order.selectedProducts}/>
					</td>
					<td className={"deliveryType"}>
						{order.deliveryType}

						{order.deliveryType === DeliveryType.delivery && <div>address panel {JSON.stringify(order.address)}</div>}

					</td>
					<td className={"paymentType"}>
						{order.paymentType}

						{order.paymentType === PaymentType.card && <div>card panel {JSON.stringify(order.creditCard)}</div>}

					</td>


				</tr>
			)}
			</tbody>
		</table>)
}
