import * as React from 'react';
import type {Address} from "../AppState";

type Props = {
	address?: Address
}

export function AddressSummary(props: Props) {
	return (
		<div className={"address"}>
			<table>
			{props.address &&
				<tbody>
				<tr><td><h4>name </h4>{props.address.name} </td>
					<td><h4>telephone: </h4>{props.address.telephone} </td></tr>
					<tr><td><h4>email</h4>{props.address.email}</td></tr>
					{props.address.street && <tr><b>Street:</b>{props.address.street}</tr>}
					{props.address.postcode && <tr><b>Postcode:</b>{props.address.postcode}</tr>}
				</tbody>}
			</table>
		</div>
	);
}

export default AddressSummary;
