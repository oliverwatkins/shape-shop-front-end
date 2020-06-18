import * as React from "react";



export default function OrderPanel(props) {
	return <tr className={"orderBox"}>
		<td className={"deliveryType"}> {props.order.deliveryType} </td>
		<td className={"paymentType"}> {props.order.paymentType} </td>
		{props.order.address &&
		<td className={"addressBox"}>
			<div className={"name"}> {props.order.address.name} </div>
			<div className={"street"}> {props.order.address.street} </div>
			<div className={"postcode"}> {props.order.address.postcode} </div>
			<div className={"tel"}> {props.order.address.telephone} </div>
		</td>}
	</tr>;
}