import type {Product} from "../AppState";


export function calculateTotal(selectedProducts, selectedDrinks) {

	let d = selectedDrinks.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	let t = selectedProducts.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	t = (t + d).toFixed(2);

	// d = d.toFixed(2);
	return t
}

