import * as React from 'react';
import type {Address} from "../AppState";


type Props = {
	address: Address
}

export function AddressSummary(props: Props) {

	// alert("props " + JSON.stringify(props))
	// let style = {
	// 	background: "white",
	// 	width: 500
	// }
	return (
		<div className={"address-summary"}>
			{props.address &&
			<div>
				<div><b>Name: </b>
				{props.address.name}</div>
				<div><b>Street:</b>
				{props.address.street}</div>
				<div><b>Postcpde:</b>
				{props.address.postcode}</div>
				<div><b>Email:</b>
				{props.address.email}</div>
				<div><b>Telephone: </b>
				{props.address.telephone} </div>
			</div>
			}


		</div>
	);
}

export default AddressSummary;