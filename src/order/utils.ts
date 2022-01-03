import type {Product} from "../AppState";


/**
 * from order list
 */
export function calculateTotal2(products: any) {
	let t = products.reduce((acc: any, cur: Product) => {
		return acc + ((cur.quantity ? cur.quantity : 0) * cur.price);
	}, 0)

	t = t.toFixed(2);
	return t
}

// elem.quantity && (elem.quantity > 1)

/**
 * from product selection
 */
export function calculateTotal(selectedProducts: any, selectedProducts2: any) {

	let t = selectedProducts.reduce((acc: any, cur: Product) => {
		return acc + ((cur.quantity ? cur.quantity : 0) * cur.price);
	}, 0)

	let d = selectedProducts2.reduce((acc: any, cur: Product) => {
		return acc + ((cur.quantity ? cur.quantity : 0) * cur.price);
	}, 0)
	t = (t + d).toFixed(2);
	return t
}

