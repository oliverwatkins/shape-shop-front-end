import * as React from "react";
import {useEffect} from "react";
import * as constants from "../constants";


// ??????????????????????????????????????????????????????????


// const fetchProducts = () => {
// 	return api.get('/' + constants.company + '/products').then(response => response);
// };

export function TestEffect(props) {

	let [products, setProducts] = React.useState([]);

	useEffect( () => {
		async function fetchData() {
			await fetch("https://jsonplaceholder.typicode.com/todos")
				.then(response => response.json())
				.then(data => {
					setProducts(data);
				});
		}
		fetchData();
	}, []);

	return (
		<table className={"productListTable"}>
			<thead>
			<tr>
				<td>item () {products.length}</td>
				<td>price</td>
				<td>type</td>
				<td>qty</td>
			</tr>
			</thead>
			<tbody>
			{products && products.map(item =>
				<tr className={"orderItemBox"} key={item.id}>
					<td> {item.name} </td>
					<td> {item.price} </td>
					<td> {item.type} </td>
					<td> {item.amount} </td>
				</tr>
			)}
			</tbody>
		</table>)
}
