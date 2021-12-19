import type {Product} from "../AppState";


/**
 * from order list
 */
export function calculateTotal2(products) {
	let t = products.reduce((acc, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	t = t.toFixed(2);
	return t
}

/**
 * from product selection
 */
export function calculateTotal(selectedProducts: any, selectedProducts2: any) {

	let t = selectedProducts.reduce((acc: any, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)

	let d = selectedProducts2.reduce((acc: any, cur: Product) => {
		return acc + (cur.quantity * cur.price);
	}, 0)
	t = (t + d).toFixed(2);
	return t
}

