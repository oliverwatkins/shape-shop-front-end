import * as React from "react";


export default function ProductListPanel(props) {
	return (
		<table className={"prodcutListTable"}>
			<thead>
			<tr>
				{/*<th>*/}
				{/*	product*/}
				{/*</th>*/}
				{/*<th>*/}
				{/*	price*/}
				{/*</th>*/}
				{/*<th>*/}
				{/*	type*/}
				{/*</th>*/}
			</tr>
			</thead>
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
