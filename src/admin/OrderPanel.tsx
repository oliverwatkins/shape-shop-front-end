import * as React from "react";

import {faCreditCard, faHandHolding, faMoneyBill, faTruck} from "@fortawesome/free-solid-svg-icons";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {calculateTotal2} from "../order/utils";
import {DeliveryType, OrderState, PaymentType} from "../AppState";

export default function OrderPanel(props: any) {
	return (
		<table className={"orderTable"}>
			<thead>
			{/*<tbody>*/}
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

				{props.type === "open" && <th>close</th>}

			</tr>
			</thead>
			<tbody>
			{props.orders && props.orders.map((order: OrderState) =>
				<tr className={"orderBox"} key={order.id}>
					<td> {order.id} </td>
					<td> <b>{order.addressEntity && order.addressEntity.name} </b></td>
					<td>
						{moment(order.date).format('HH:mm DD/MM/YYYY')}
					</td>

					<td>
						<ProductListPanel orderItems={order.orderItems}/>

						<b>TOTAL PRICE : {calculateTotal2(order.orderItems)} </b>
					</td>

					<td className={"deliveryType"}>
						{order.deliveryType === DeliveryType.delivery && <div className="icon-container">
							<FontAwesomeIcon icon={faTruck} style={{fontSize: "14px", color: "navy", margin: "1px"}}/> {order.deliveryType}
						</div>}
						{order.deliveryType === DeliveryType.pickup && <div className="icon-container">
							<FontAwesomeIcon icon={faHandHolding} style={{fontSize: "14px", color: "pink", margin: "1px"}}/> {order.deliveryType}
						</div>}
						<AddressPanel address={order.addressEntity}/>
					</td>
					<td className={"paymentType"}>
						{order.paymentType === PaymentType.cash && <div className="icon-container">
							<FontAwesomeIcon icon={faMoneyBill} style={{fontSize: "14px", color: "green", margin: "1px"}}/> {order.paymentType}
						</div>}
						{order.paymentType === PaymentType.card && <div className="icon-container">
							<FontAwesomeIcon icon={faCreditCard} style={{fontSize: "14px", color: "black", margin: "1px"}}/> {order.paymentType}
							<CardPanel creditCard={order.creditCardEntity}/>
						</div>}
					</td>
					{props.type === "open" && <td>
						<button>CLOSE</button>
					</td>}
				</tr>
			)}
		</tbody>
	</table>)
}


function AddressPanel(props: any) {
	return (
		<div>
			<table className={"contactTable"}>
				<tbody>
					<tr>
						<td colSpan={2}>{props.address.name && <span>{props.address.name}</span>}</td>
					</tr>
					<tr>
						<td>{props.address.street && <span>{props.address.street}</span>}</td>
						<td>{props.address.postcode && <span>{props.address.postcode}</span>}</td>
					</tr>
					<tr>
						<td colSpan={2}>Tel : {props.address.telephone && <span>{props.address.telephone}</span>}</td>
					</tr>
					<tr>
						<td colSpan={2}>Email : {props.address.email && <span>{props.address.email}</span>}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

function CardPanel(props: any) {
	if (!props.creditCard)
		return <span>  </span>;

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>{props.creditCard.number && <span>{props.creditCard.number}</span>}</td>
						<td>{props.creditCard.expDate && <span>{props.creditCard.expDate}</span>}</td>
						<td>{props.creditCard.name && <span>{props.creditCard.name}</span>}</td>
						<td>{props.creditCard.type && <span>{props.creditCard.type}</span>}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

function ProductListPanel(props: any) {
	return (
		<table className={"productListTable"}>
			<thead>
				<tr>
					<td>item</td>
					<td>price</td>
					<td>type</td>
					<td>qty</td>
				</tr>
			</thead>
			<tbody>
			{props.orderItems && props.orderItems.map((item: any) =>
				<tr className={"orderItemBox"} key={item.id}>
					<td> {item.product.name} </td>
					<td> {item.product.price} </td>
					<td> {item.product.type} </td>
					<td> {item.amount} </td>
				</tr>
			)}
			</tbody>
		</table>)
}
